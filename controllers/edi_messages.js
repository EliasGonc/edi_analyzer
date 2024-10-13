const EdiMessage = require("../models/edi_message");

const validateRequestAttribute = function(requestAttribute) {
    const { edi_standard_id, message_type_id, message_version_id } = requestAttribute;
    if (!edi_standard_id || !message_type_id || !message_version_id ) {
        throw new Error("Missing ID(s): " 
            + `${edi_standard_id ? "edi_standard_id; " : ""}`
            + `${message_type_id ? "message_type_id; " : ""}`
            + `${message_version_id ? "message_version_id; " : ""}`
        );
    }
}

exports.getEdiMessages = async (req, res) => {
    const { edi_standard_id, message_type_id, message_version_id } = req.query;
    const whereClause = {};
    if (edi_standard_id) whereClause.edi_standard_id = edi_standard_id;
    if (message_type_id) whereClause.message_type_id = message_type_id;
    if (message_version_id) whereClause.message_version_id = message_version_id;
    console.log(whereClause);
    try {
        res.json(await EdiMessage.findAll({ where: whereClause }));
    } catch (err) {
        console.error("Error fetching EDI messages:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createEdiMessage = async (req, res) => {
    try {
        validateRequestAttribute(req.body);
        const { edi_standard_id, message_type_id, message_version_id } = req.body;
        const newEdiMessage = await EdiMessage.create(
            { edi_standard_id, message_type_id, message_version_id }
        );
        res.status(201).json(newEdiMessage);
    } catch (err) {
        console.error("Error creating EDI message:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateEdiMessage = async (req, res) => {
    try {
        validateRequestAttribute(req.body);
        const { edi_standard_id, message_type_id, message_version_id } = req.body;
        const ediMessage = await EdiMessage.findByPk(req.params.id);
        if (!ediMessage) {
            return res.status(404).json({ error: "EDI Message not found" });
        }
        ediMessage.edi_standard_id = edi_standard_id ?? ediMessage.edi_standard_id;
        ediMessage.message_type_id = message_type_id ?? ediMessage.message_type_id;
        ediMessage.message_version_id = message_version_id ?? ediMessage.message_version_id;
        await ediMessage.save();
        res.json(ediMessage);
    } catch (err) {
        console.error("Error updating EDI message:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteEdiMessage = async (req, res) => {
    try {
        validateRequestAttribute(req.query);
        const { edi_standard_id, message_type_id, message_version_id } = req.query;
        const ediMessage = await EdiMessage.findByPk(req.params.id);
        if (!ediMessage) {
            return res.status(404).json({ error: "EDI Message not found" });
        }
        await ediMessage.destroy();
        res.json({ message: "EDI Message deleted successfully" });
    } catch (err) {
        console.error("Error deleting EDI message:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
