const { EdiMessageContent } = require("../models/associations");
const { createWhereClause } = require("./helper_functions")

exports.getEdiMessageContents = async (req, res) => {
    const whereClause = createWhereClause(req.query, EdiMessageContent);
    try {
        res.status(200).json(await EdiMessageContent.findAll({ where: whereClause }));
    } catch (err) {
        console.error("Error fetching all messages segments", err);
        res.status(500).json({ error: "Internal server error", code: 500, details: err.message });
    }
}
