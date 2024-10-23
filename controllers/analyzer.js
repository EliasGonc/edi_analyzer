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
        console.log(param);
        queryString += `${param}=${params[param]}&`
    }
    return queryString.substring(0, queryString.length - 1);
}

const getAxiosResponseData = async function(method, url, params, index = undefined) {
    try {
        console.log(params);
        console.log(`${url}${createQueryString(params)}`);
        const axiosResponse = await axios({
            method: method,
            url: `${url}${createQueryString(params)}`
        });
        if (index) {
            return axiosResponse.data;
        }
        return axiosResponse.data[index];
    } catch (err) { 
        console.error("Error getting Axios response data: ", err);
    }
}

const getDatabaseData = async req => {
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
        db.messageContent = await getAxiosResponseData("get", "/api/message-contents", {
            edi_message_id: db.ediMessage.id
        });
        return db;
    } catch (err) {
        console.error("Error fetching database data: ", err);
        res.static(500).json("Internal server error");
    }
}

exports.analyzeMessage = async function(req, res) {
    const data = await getDatabaseData(req);
    res.status(200).json(data);
}