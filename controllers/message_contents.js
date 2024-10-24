const { MessageContent } = require("../models/associations");
const { createWhereClause } = require("./helper_functions")

exports.getMessageContents = async (req, res) => {
    const whereClause = createWhereClause(req.query, MessageContent);
    try {
        res.status(200).json(await MessageContent.findAll({ where: whereClause }));
    } catch (err) {
        console.error("Error fetching all messages contents", err);
        res.status(500).json({ error: "Internal server error", code: 500, details: err.message });
    }
}
