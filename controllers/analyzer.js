const sequelize = require("../db/connect");
const { EdiStandard, MessageType, MessageVersion, EdiMessage,
    Segment, DataElement, MessageContent, SegmentContent } = require("../models/associations");
const ErrorMessage = require("../models/error_message");
const axios = require("../axiosInstance");
const { create } = require("../models/edi_standard");

const createQueryString = function(params) {
    let queryString = "?";
    for (let param in params) {
        queryString += `${param}=${params[param]}&`
    }
    return queryString.substring(0, queryString.length - 1);
}

const getAxiosResponseData = async function(method, url, params, index = undefined) {
    try {
        const axiosResponse = await axios({
            method: method,
            url: `${url}${ params ? createQueryString(params) : ""}`
        });
        if (index === undefined) {
            return axiosResponse.data;
        }
        return axiosResponse.data[index];
    } catch (err) { 
        console.error("Error getting Axios response data: ", err);
    }
}

const createMessageObject = function(databaseData) {
    const ediMessage = {};
    ediMessage.id = databaseData.ediMessage.id;
    ediMessage.standard = databaseData.ediStandard;
    ediMessage.type = databaseData.messageType;
    ediMessage.version = databaseData.messageVersion;
    ediMessage.contents = databaseData.messageContents;
}

const getDatabaseDataOld = async (req, res) => {
    const db = {};
    try {
        db.standard = await getAxiosResponseData("get", "/api/edi-standards", {
            name: req.body.standard
        }, 0);
        db.type = await getAxiosResponseData("get", "/api/message-types", {
            name: req.body.type,
            edi_standard_id: db.standard.id
        }, 0);
        db.version = await getAxiosResponseData("get", "/api/message-versions", {
            name: req.body.version,
            message_type_id: db.type.id
        }, 0);
        db.ediMessage = await getAxiosResponseData("get", "/api/edi-messages", {
            edi_standard_id: db.standard.id,
            message_type_id: db.type.id,
            message_version_id: db.version.id
        }, 0);
        db.messageContents = await getAxiosResponseData("get", "/api/message-contents", {
            edi_message_id: db.ediMessage.id
        });
        db.segments = [];
        db.segmentContents = [];
        for (let messageContent of db.messageContents) {
            const segmentId = messageContent.segment_id;
            const segment = await getAxiosResponseData("get", `/api/segments/${segmentId}`);
            if (!db.segments.some(segment => segment.id === segmentId)) {
                db.segments.push(segment);
            }
            db.segmentContents.push(...await getAxiosResponseData("get",
                "/api/segment-contents", { segment_id: messageContent.segment_id }
            ));
        }
        db.dataElements = [];
        for (let segmentContent of db.segmentContents) {
            const dataElement = await getAxiosResponseData("get", 
                `/api/data-elements/${segmentContent.data_element_id}`
            );
            if (!db.dataElements.some(element => element.id === dataElement.id)) {
                db.dataElements.push(dataElement);
            }
        }
        return db;
    } catch (err) {
        console.error("Error fetching database data: ", err);
        res.status(500).json("Internal server error");
    }
}

const getDatabaseData = async function(req, res) {
    const { body } = req;
    const data = {};
    try {
        data.standard = await EdiStandard.findOne({ where: { name: body.standard }});
        data.type = await MessageType.findOne({ where: { 
            name: body.type, edi_standard_id: data.standard.id
        }});
        data.version = await MessageVersion.findOne({ where: {
            name: body.version, message_type_id: data.type.id
        }});
        data.ediMessage = await EdiMessage.findOne({ where: {
            edi_standard_id: data.standard.id,
            message_type_id: data.type.id,
            message_version_id: data.version.id
        }});
        data.messageContents = await MessageContent.findAll({ where: {
            edi_message_id: data.ediMessage.id
        }});
        data.segments = [];
        data.segmentContents = [];
        for (let messageContent of data.messageContents) {
            const segmentId = messageContent.segment_id;
            if (!data.segments.some(segment => segment.id === segmentId)) {
                data.segments.push(await Segment.findByPk(segmentId));
                data.segmentContents.push(...await SegmentContent.findAll({ where: {
                    segment_id: segmentId }
                }));
            }
        }
        data.dataElements = [];
        for (let segmentContent of data.segmentContents) {
            const dataElementId = segmentContent.data_element_id;
            if (!data.dataElements.some(element => element.id === dataElementId)) {
                data.dataElements.push(await DataElement.findByPk(dataElementId));
            }
        }
        return data;
    } catch (err) {
        console.error("Error fetching database data: ", err);
        res.status(500).json("Internal server error");
    }
}

const checkMessageHeader = function(standard, type, version, message) {
    regex = {};
    regex.standard = new RegExp(standard.identifier);
    regex.type = new RegExp(type.identifier);
    regex.version = new RegExp(version.identifier);
    return regex.standard.test(message) && regex.type.test(message) && regex.version.test(message);
}

const parseErrorMessage = async function(errorId) {
    const errorMessage = await ErrorMessage.findByPk(errorId);
    for (let i = 1; i < arguments.length; i++) {
        errorMessage.message = errorMessage.message.replace(`[?${i}]`, arguments[i]);
    }
    return errorMessage;
}

const removeNewLines = function(message) {
    return message.replace(/[\r\n]/g, "");
}

const segmentMessage = async function(message, dbData) {
    const { segments, ediMessage } = dbData;
    message = removeNewLines(message);
    const segmentedMessage = [];
    while(message) {
        let hasUnknownSegment = true;
        for (let segment of segments) {
            const pattern = new RegExp(`^${segment.code}`)
            if (message.search(pattern) === 0) {
                hasUnknownSegment = false;
                segmentedMessage.push({
                    segment: segment,
                    content: message.slice(
                        segment.code.length,
                        segment.segment_length - segment.code.length
                    )
                });
                message = message.slice(segment.segment_length)
            }
        }
        if (hasUnknownSegment) {
            const unknownSegmentcode = message.substring(0, ediMessage.segment_code_length);
            const errorMessage = await parseErrorMessage(2, unknownSegmentcode);
            const error = new Error(errorMessage.message);
            error.title = errorMessage.title;
            throw error;
        };
    }
    return segmentedMessage;
}

const analyzeMessage = function(message, dbData) {
    const segmentedMessage = segmentMessage(message, dbData.segments);
}


exports.analyzeMessage = async function(req, res) {
    const dbData = await getDatabaseData(req, res);
    const responseJson = { analysis: "", modal: "" };
    if (!checkMessageHeader(dbData.standard, dbData.type, dbData.version, req.body.message)) {
        const errorMessage = await parseErrorMessage(1, dbData.standard.name, dbData.type.name, dbData.version.name);
        responseJson.modal = { title: errorMessage.title, body: errorMessage.message };
    } else {
        try {
            const segmentedMessage = await segmentMessage(req.body.message, dbData);
            responseJson.analysis = segmentedMessage;
        } catch (err) {
            responseJson.modal = { title: err.title, body: err.message };
        }
        // analyzeMessage(req.body.message, dbData);
    }
    res.status(200).json(responseJson);
}