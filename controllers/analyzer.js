/*
const ediStandardController = require("./edi_standards");
const messageTypeController = require("./message_types");
const messageVersionController = require("./message_versions");
const ediMessageController = require("./edi_messages");
const segmentController = require("./segments");
const dataElementController = require("./data_elements");
const messageContentController = require("./message_contents");
const segmentContentController = require("./segment_contents");
*/
const sequelize = require("../db/connect");
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

const getDatabaseData = async (req, res) => {
    const db = {};
    // const ediMessage = {};
    try {
        /*
        await sequelize.query(`
                SELECT edi_message.id
                  FROM edi_message
            INNER JOIN edi_standard    ON edi_standard.id = edi_message.edi_standard_id
            INNER JOIN message_type    ON message_type.id = edi_message.message_type_id
            INNER JOIN message_version ON message_version.id = edi_message.message_version_id
                 WHERE edi_standard.name = '${req.body.standard}'
                       AND message_type.name = '${req.body.type}'
                       AND message_version.name = '${req.body.version}'
        `, { type: sequelize.QueryTypes.SELECT })
            .then(results => ediMessage.id = results[0])
            .catch(err => console.log(err));
        ediMessage.standard = await getAxiosResponseData("get", "/api/edi-standards", {
            name: req.body.standard
        }, 0);
        ediMessage.type = await getAxiosResponseData("get", "/api/message-types", {
            name: req.body.type,
            edi_standard_id: ediMessage.standard.id
        }, 0);
        ediMessage.version = await getAxiosResponseData("get", "/api/message-versions", {
            name: req.body.version,
            message_type_id: ediMessage.type.id
        }, 0);
        await sequelize.query(`
                SELECT 
                  FROM message_content
            INNER JOIN segment ON segment.id = message_content.segment_id
                 WHERE message_content.edi_message_id = '${ediMessage.id}'
                   AND segment 
        `)
            .then()
            .catch();
        */
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
        // return ediMessage;
    } catch (err) {
        console.error("Error fetching database data: ", err);
        res.status(500).json("Internal server error");
    }
}

exports.analyzeMessage = async function(req, res) {
    const data = await getDatabaseData(req);
    res.status(200).json(data);
}