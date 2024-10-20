// const MessageType = require("../models/message_type");
const { MessageType } = require("../models/associations");
const { createWhereClause } = require("./helper_functions");

exports.getMessageTypes = async (req, res) => {
    try {
        res.json(await MessageType.findAll({
            where: createWhereClause(req.query, MessageType)
        }));
    } catch (err) {
        console.error("Error fetching message types:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getMessageTypeById = async (req, res) => {
    try {
        const messageType = await MessageType.findByPk(req.params.id);
        if (!messageType) {
            return res.status(404).json({ error: "Message type not found" });
        }
        res.json(messageType);
    } catch (err) {
        console.error("Error fetching message type:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createMessageType = async (req, res) => {
    try {
        const { name, identifier, edi_standard_id } = req.body;
        const newMessageType = await MessageType.create({ name, identifier, edi_standard_id });
        res.status(201).json(newMessageType);
    } catch (err) {
        console.error("Error creating message type:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateMessageType = async (req, res) => {
    try {
        const { name, identifier, edi_standard_id } = req.body;
        const messageType = await MessageType.findByPk(req.params.id);
        if (!messageType) {
            return res.status(404).json({ error: "Message type not found" });
        }
        messageType.name = name ?? messageType.name;
        messageType.identifier = identifier ?? messageType.identifier;
        messageType.edi_standard_id = edi_standard_id ?? messageType.edi_standard_id;
        await messageType.save();
        res.json(messageType);
    } catch (err) {
        console.error("Error updating message type:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteMessageType = async (req, res) => {
    try {
        const messageType = await MessageType.findByPk(req.params.id);
        if (!messageType) {
            return res.status(404).json({ error: "Message type not found" });
        }
        await messageType.destroy();
        res.json({ message: "Message type deleted successfully" });
    } catch (err) {
        console.error("Error deleting message type:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
