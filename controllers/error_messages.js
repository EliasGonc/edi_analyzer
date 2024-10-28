const ErrorMessage = require("../models/error_message");
const { createWhereClause, validateRequestAttributes } = require("./helper_functions");

exports.getErrorMessages = async (req, res) => {
    try {
        res.status(200).json(ErrorMessage.findAll({
            where: createWhereClause(req.query), ErrorMessage
        }));
    } catch (err) {
        console.error("Error fetching error messages: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
