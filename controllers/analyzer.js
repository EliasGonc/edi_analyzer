const { EdiStandard, MessageType, MessageVersion, EdiMessage,
    Segment, DataElement, EdiMessageContent, SegmentContent } = require("../models/associations");
const ErrorMessage = require("../models/error_message");
const axios = require("../axiosInstance");
const { create } = require("../models/edi_standard");
const { removeLineFeeds, toTitleCase } = require("../utils/stringUtils");

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
        data.messageContents = await EdiMessageContent.findAll({ where: {
            edi_message_id: data.ediMessage.id
        }});
        data.segments = [];
        data.segmentContents = [];
        for (let messageContent of data.messageContents) {
            const segmentId = messageContent.segment_id;
            if (!data.segments.some(segment => segment.id === segmentId)) {
                data.segments.push(await Segment.findByPk(segmentId));
                data.segmentContents.push(...await SegmentContent.findAll(
                    { where: { segment_id: segmentId } },
                    { order: [[ "position", "ASC" ]] }
                ));
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

const segmentUserMessage = async function(userMessage, dbData) {
    const { segments, ediMessage } = dbData;
    userMessage = removeLineFeeds(userMessage);
    const segmentedUserMessage = [];
    while(userMessage) {
        let hasUnknownSegment = true;
        for (let segment of segments) {
            const pattern = new RegExp(`^${segment.code}`)
            if (userMessage.search(pattern) === 0) {
                hasUnknownSegment = false;
                segmentedUserMessage.push({
                    segment: segment,
                    content: userMessage.slice(
                        segment.code.length,
                        segment.segment_length - segment.code.length
                    )
                });
                userMessage = userMessage.slice(segment.segment_length)
            }
        }
        if (hasUnknownSegment) {
            const unknownSegmentCode = userMessage.substring(0, ediMessage.segment_code_length);
            const errorMessage = await parseErrorMessage(2, unknownSegmentCode);
            const error = new Error(errorMessage.message);
            error.title = errorMessage.title;
            throw error;
        };
    }
    return segmentedUserMessage;
}

const analyzeSegment = function(segment, dbData) {
    const { segmentContents, dataElements } = dbData;
    for (let segmentContent of segmentContents ) {}
}

const getCurrentSegmentData = function(userMessageSegment, segmentContents) {
    const currentSegment = {};
    currentSegment.userContents = userMessageSegment.contents;
    currentSegment.dbContents = segmentContents.filter(
        content => content.segment_id === userMessageSegment.segment.id
    );
    currentSegment.cursor = 0;
    return currentSegment;
}

const resolveDataElementData = function(segmentContent, dataElement) {
    const resolvedDataElement = { ...dataElement };
    resolvedDataElement.usage = segmentContent.usage ? segmentContent.usage : dataElement.usage;
    resolvedDataElement.fixed_length = segmentContent.fixed_length
        ? segmentContent.fixed_length
        : dataElement.fixed_length;
    resolvedDataElement.minimum_length = segmentContent.minimum_length
        ? segmentContent.minimum_length
        : dataElement.minimum_length;
    resolvedDataElement.maximum_length = segmentContent.maximum_length
        ? segmentContent.maximum_length
        : dataElement.maximum_length;
    resolvedDataElement.possible_values = segmentContent.possible_values
        ? segmentContent.possible_values
        : dataElement.possible_values;
    return resolvedDataElement;
}

const analyzeUserMessage = async function(segmentedUserMessage, dbData) {
    const { segmentContents, dataElements } = dbData;
    const currentSegment = getCurrentSegmentData(segmentedUserMessage[0], segmentContents);
    const responseData = [];
    for (let content of currentSegment.dbContents) {
        const currentElement = resolveDataElementData(content, dataElements.find(
            element => element.id === content.data_element_id
        ));
        let isValid = true;
        for (let possible_value of currentElement.possible_values) {
            const regex = new RegExp(possible_value);
            if (!regex.test(currentSegment.userContents.substring(currentSegment.cursor, currentElement.fixed_length))) {
                isValid = false;
            }
        }
        responseData.push({
            element: toTitleCase(currentElement.name),
            description: currentElement.description,
            possibleValues: currentElement.possible_values
        });
    }
    return responseData;
}

exports.analyzeMessage = async function(req, res) {
    const dbData = await getDatabaseData(req, res);
    const responseJson = { analysis: "", modal: "" };
    if (!checkMessageHeader(dbData.standard, dbData.type, dbData.version, req.body.message)) {
        const errorMessage = await parseErrorMessage(1, dbData.standard.name, dbData.type.name, dbData.version.name);
        responseJson.modal = { title: errorMessage.title, body: errorMessage.message };
    } else {
        try {
            const segmentedMessage = await segmentUserMessage(req.body.message, dbData);
            const messageAnalysis = await analyzeUserMessage(segmentedMessage, dbData);
            responseJson.analysis = messageAnalysis;
        } catch (err) {
            responseJson.modal = { title: err.title, body: err.message };
        }
        // analyzeMessage(req.body.message, dbData);
    }
    res.status(200).json(responseJson);
}