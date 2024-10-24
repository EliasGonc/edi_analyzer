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

const getDatabaseData = async (req, res) => {
    const db = {};
    try {
        db.ediStandard = await getAxiosResponseData("get", "/api/edi-standards", {
            name: req.body.standard
        }, 0);
        db.messageType = await getAxiosResponseData("get", "/api/message-types", {
            name: req.body.type,
            edi_standard_id: db.ediStandard.id
        }, 0);
        db.messageVersion = await getAxiosResponseData("get", "/api/message-versions", {
            name: req.body.version,
            message_type_id: db.messageType.id
        }, 0);
        db.ediMessage = await getAxiosResponseData("get", "/api/edi-messages", {
            edi_standard_id: db.ediStandard.id,
            message_type_id: db.messageType.id,
            message_version_id: db.messageVersion.id
        }, 0);
        db.messageContents = await getAxiosResponseData("get", "/api/message-contents", {
            edi_message_id: db.ediMessage.id
        });
        /*
        db.ediMessage.contents = await getAxiosResponseData("get", "/api/message-contents", {
            edi_message_id: db.ediMessage.id
        });
        */
        db.segments = [];
        db.segmentContents = [];
        for (let messageContent of db.messageContents) {
            db.segments.push(await getAxiosResponseData("get", 
                `/api/segments/${messageContent.segment_id}`
            ));
            db.segmentContents.push(...await getAxiosResponseData("get",
                "/api/segment-contents", { segment_id: messageContent.segment_id }
            ));
        }
        db.dataElements = [];
        
            /*
        for (let messageContent of db.ediMessage.contents) {
            messageContent.segment = { info: [], contents: [] };
            messageContent.segment.info = await getAxiosResponseData("get",
                `/api/segments/${messageContent.segment_id}`
            );
            messageContent.segment.contents = await getAxiosResponseData("get",
                "/api/segment-contents", { segment_id: messageContent.segment_id }
            );
            for (let segmentContent of messageContent.segment.contents) {
                segmentContent.dataElement = await getAxiosResponseData("get", 
                    "/api/data-elements", { data_element_id: segmentContent.data_element_id }
                );
            }
        }*/
        return db;
    } catch (err) {
        console.error("Error fetching database data: ", err);
        res.status(500).json("Internal server error");
    }
}

exports.analyzeMessage = async function(req, res) {
    const data = await getDatabaseData(req);
    // console.log(data);
    res.status(200).json(data);
}