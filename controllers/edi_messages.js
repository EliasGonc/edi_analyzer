const EdiMessage = require("../models/edi_message");
const { createWhereClause } = require("./helper_functions");

exports.getEdiMessages = async (req, res) => {
    try {
        res.json(await EdiMessage.findAll(
            { where: createWhereClause(req.query, EdiMessage) }
        ));
    } catch (err) {
        console.error("Error fetching EDI messages:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getEdiMessageById = async (req, res) => {
    try {
        const ediMessage = await EdiMessage.findByPk(req.params.id);
        if (!ediMessage) {
            return res.status(404).json({ error: "EDI Message not found" });
        }
        res.json(ediMessage);
    } catch (err) {
        console.error("Error fetching EDI message:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
