// const MessageVersion = require("../models/message_version");
const { MessageVersion } = require("../models/associations");
const { createWhereClause } = require("./helper_functions");

exports.getMessageVersions = async (req, res) => {
    try {
        res.json(await MessageVersion.findAll({
            where: createWhereClause(req.query, MessageVersion)
        }));
    } catch (err) {
        console.error("Error fetching message versions:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getMessageVersionById = async (req, res) => {
    try {
        const messageVersion = await MessageVersion.findByPk(req.params.id);
        if (!messageVersion) {
            return res.status(404).json({ error: "Message version not found" });
        }
        res.json(messageVersion);
    } catch (err) {
        console.error("Error fetching message version:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createMessageVersion = async (req, res) => {
    try {
        const { name, identifier, message_type_id } = req.body;
        const newMessageVersion = await MessageVersion.create({ name, identifier, message_type_id });
        res.status(201).json(newMessageVersion);
    } catch (err) {
        console.error("Error creating message version:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateMessageVersion = async (req, res) => {
    try {
        const { name, identifier, message_type_id } = req.body;
        const messageVersion = await MessageVersion.findByPk(req.params.id);
        if (!messageVersion) {
            return res.status(404).json({ error: "Message version not found" });
        }
        messageVersion.name = name ?? messageVersion.name;
        messageVersion.identifier = identifier ?? messageVersion.identifier;
        messageVersion.message_type_id = message_type_id ?? messageVersion.message_type_id;
        await messageVersion.save();
        res.json(messageVersion);
    } catch (err) {
        console.error("Error updating message version:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteMessageVersion = async (req, res) => {
    try {
        const messageVersion = await MessageVersion.findByPk(req.params.id);
        if (!messageVersion) {
            return res.status(404).json({ error: "Message version not found" });
        }
        await messageVersion.destroy();
        res.json({ message: "Message version deleted successfully" });
    } catch (err) {
        console.error("Error deleting message version:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
