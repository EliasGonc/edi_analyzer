const { SegmentContent } = require("../models/associations");
const { createWhereClause } = require("./helper_functions");

exports.getSegmentContents = async (req, res) => {
    try {
        res.status(200).json(await SegmentContent.findAll({
            where: createWhereClause(req.query, SegmentContent)
        }));
    } catch (err) {
        console.error("Error fetching segment contents: ", err);
        res.status(500).json({ error: "Internal server error", code: 500, details: err.message });
    }
}