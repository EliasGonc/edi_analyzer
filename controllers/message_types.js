const MessageType = require("../models/message_type");

exports.getAllMessageTypes = async (req, res) => {
    try {
        const { edi_standard_id } = req.query;
        if (!edi_standard_id) {
            const messageTypes = await MessageType.findAll();
        } else {
            const messageTypes = await MessageType.findAll({
                where: {
                    edi_standard_id: edi_standard_id
                }
            });
            res.json(messageTypes);
        }
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
        const { name, identifier } = req.body;
        const newMessageType = await MessageType.create({ name, identifier });
        res.status(201).json(newMessageType);
    } catch (err) {
        console.error("Error creating message type:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateMessageType = async (req, res) => {
    try {
        const { name, identifier } = req.body;
        const messageType = await MessageType.findByPk(req.params.id);

        if (!messageType) {
            return res.status(404).json({ error: "Message type not found" });
        }

        messageType.name = name ?? messageType.name;
        messageType.identifier = identifier ?? messageType.identifier;
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
