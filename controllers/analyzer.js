const { EdiStandard, MessageType, MessageVersion, EdiMessage,
    Segment, DataElement, EdiMessageContent, SegmentContent } = require("../models/associations");
const ErrorMessage = require("../models/error_message");
const axios = require("../axiosInstance");
const { create } = require("../models/edi_standard");
const { removeLineFeeds, toTitleCase } = require("../utils/stringUtils");

const createQueryString = function (params) {
    let queryString = "?";
    for (let param in params) {
        queryString += `${param}=${params[param]}&`
    }
    return queryString.substring(0, queryString.length - 1);
}

const getDatabaseData = async function (req, res) {
    const { body } = req;
    const data = {};
    try {
        data.standard = await EdiStandard.findOne({ where: { name: body.standard } });
        data.type = await MessageType.findOne({
            where: {
                name: body.type, edi_standard_id: data.standard.id
            }
        });
        data.version = await MessageVersion.findOne({
            where: {
                name: body.version, message_type_id: data.type.id
            }
        });
        data.ediMessage = await EdiMessage.findOne({
            where: {
                edi_standard_id: data.standard.id,
                message_type_id: data.type.id,
                message_version_id: data.version.id
            }
        });
        data.messageContents = await EdiMessageContent.findAll({
            where: {
                edi_message_id: data.ediMessage.id
            }
        });
        data.segments = [];
        data.segmentsContents = [];
        for (let messageContent of data.messageContents) {
            const segmentId = messageContent.segment_id;
            if (!data.segments.some(segment => segment.id === segmentId)) {
                data.segments.push(await Segment.findByPk(segmentId));
                data.segmentsContents.push(...await SegmentContent.findAll(
                    { where: { segment_id: segmentId } },
                    { order: [["segment_id", "ASC"], ["position", "ASC"]] }
                ));
            }
        }
        data.dataElements = [];
        for (let segmentContent of data.segmentsContents) {
            const dataElementId = segmentContent.data_element_id;
            if (!data.dataElements.some(element => element.id === dataElementId)) {
                data.dataElements.push(await DataElement.findByPk(dataElementId, { raw: false }));
            }
        }
        return data;
    } catch (err) {
        console.error("Error fetching database data: ", err);
        res.status(500).json("Internal server error");
    }
}

const checkMessageHeader = function (standard, type, version, message) {
    regex = {};
    regex.standard = new RegExp(standard.identifier);
    regex.type = new RegExp(type.identifier);
    regex.version = new RegExp(version.identifier);
    return regex.standard.test(message) && regex.type.test(message) && regex.version.test(message);
}

const parseErrorMessage = async function (errorId) {
    const errorMessage = await ErrorMessage.findByPk(errorId);
    for (let i = 1; i < arguments.length; i++) {
        errorMessage.message = errorMessage.message.replace(`[?${i}]`, arguments[i]);
    }
    return errorMessage;
}

const segmentUserMessage = async function (userMessage, dbData) {
    const { segments, ediMessage } = dbData;
    userMessage = removeLineFeeds(userMessage);
    const segmentedUserMessage = [];
    while (userMessage) {
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

const analyzeDataElement = function (responseData, segment, dataElement) {
    const regex = new RegExp(dataElement.data.possible_values);
    const isValid = regex.test(dataElement.value);
    segment.cursor += dataElement.data.fixed_length;
    responseData[responseData.length - 1].dataElements.push({
        element: toTitleCase(dataElement.data.name),
        description: dataElement.data.description,
        length: dataElement.data.fixed_length,
        value: dataElement.value,
        possibleValues: dataElement.data.possible_values,
        isValid
    });
    return isValid;
}

const resolveDataElementData = function (segmentContent, dataElement) {
    const resolvedDataElement = { ...dataElement.dataValues };
    const columns = ["usage", "fixed_length", "minimum_length", "maximum_length", "possible_values"];
    for (let column of columns) {
        if (segmentContent[column] !== null) {
            resolvedDataElement[column] = segmentContent[column];
        }
    }
    return resolvedDataElement;
}

const analyzeSegment = function (responseData, segment, dbData) {
    for (let content of segment.contents) {
        const dataElement = { value: "", data: "" };
        dataElement.data = resolveDataElementData(content.dataValues, dbData.dataElements.find(
            dataElement => dataElement.dataValues.id === content.data_element_id
        ));
        console.log(`${segment.data.code} segment, element #${content.position}, data element ${dataElement.data.code}`);
        dataElement.value = segment.value.substring(
            segment.cursor,
            segment.cursor + dataElement.data.fixed_length
        );
        const dataElementIsValid = analyzeDataElement(responseData, segment, dataElement);
        if (!dataElementIsValid) {
            responseData[responseData.length-1].segment.hasError = true;
        }
    }
}

const getCurrentSegmentData = function (userMessageSegment, dbData) {
    const currentSegment = {};
    currentSegment.value = userMessageSegment.content;
    currentSegment.contents = dbData.segmentsContents.filter(
        segmentContent => segmentContent.segment_id === userMessageSegment.segment.id
    );
    currentSegment.data = dbData.segments.find(
        segment => segment.id === userMessageSegment.segment.id
    );
    currentSegment.cursor = 0;
    currentSegment.hasError = false;
    return currentSegment;
}

/**
* Analyzes the user message and returns an array with the analysis results
* @param {Array} segmentedUserMessage - An array where each entry contains an object with the user message segment raw segment contents and the segment information
* @param {Array} dbData - An array containing the database information of all elements of an EDI messages
* @param {Array} responseData - An array that will contain the analysis of the user message, since this function is recursive
*/
const analyzeUserMessage = function (responseData, segmentedUserMessage, dbData) {
    const currentSegment = getCurrentSegmentData(segmentedUserMessage[0], dbData);
    responseData.push({ segment: currentSegment, dataElements: [] });
    analyzeSegment(responseData, currentSegment, dbData);
    if (segmentedUserMessage.length > 1) {
        analyzeUserMessage(responseData, segmentedUserMessage.slice(1), dbData);
    }
}

exports.analyzeMessage = async function (req, res) {
    const dbData = await getDatabaseData(req, res);
    const responseJson = { analysis: "", modal: "" };
    if (!checkMessageHeader(dbData.standard, dbData.type, dbData.version, req.body.message)) {
        const errorMessage = await parseErrorMessage(1, dbData.standard.name, dbData.type.name, dbData.version.name);
        responseJson.modal = { title: errorMessage.title, body: errorMessage.message };
    } else {
        try {
            const responseData = [];
            const segmentedMessage = await segmentUserMessage(req.body.message, dbData);
            analyzeUserMessage(responseData, segmentedMessage, dbData);
            responseJson.analysis = responseData;
        } catch (err) {
            console.error(err);
            responseJson.modal = { title: err.title, body: err.message };
        }
    }
    res.status(200).json(responseJson);
}