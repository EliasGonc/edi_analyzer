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

const getDatabaseData = async req => {
    const db = {}
    try {
        db.ediStandard = await axios.get("/api/edi-standards", { params: { name: req.body.standard } });
        db.messageType = await axios.get("/api/message-types", {
            params: { name: req.body.type, edi_standard_id: db.ediStandard.data[0].id }
        });
        db.messageVersion = await axios.get("/api/message-versions", { params:
            { name: req.body.version, message_type_id: db.messageType.data[0].id }
        });
        db.ediMessage = await axios.get("/api/edi-messages", { params: {
            edi_standard_id: db.ediStandard.data[0].id,
            message_type_id: db.messageType.data[0].id,
            message_version_id: db.messageVersion.data[0].id
        }});
        return db;
    } catch (err) {
        console.error("Error fetching database data: ", err);
        res.static(500).json("Internal server error");
    }
}

exports.analyzeMessage = async function(req, res) {
    const data = await getDatabaseData(req);
    return data;
    /*
    console.log(data.ediStandard.data);
    console.log(data.messageType.data);
    console.log(data.messageVersion.data);
    console.log(data.ediMessage.data);
    */
}