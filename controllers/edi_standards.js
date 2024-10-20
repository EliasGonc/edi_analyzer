const { EdiStandard } = require("../models/associations");
const { createWhereClause, validateRequestAttributes } = require("./helper_functions");

exports.getEdiStandards = async (req, res) => {
    try {
        res.json(await EdiStandard.findAll({
            where: createWhereClause(req.query, EdiStandard)
        }));
    } catch (err) {
        console.error("Error fetching EDI standards:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getEdiStandardById = async (req, res) => {
    try {
        const ediStandard = await EdiStandard.findByPk(req.params.id);
        if (!ediStandard) {
            return res.status(404).json({ error: "EDI Standard not found" });
        }
        res.json(ediStandard);
    } catch (err) {
        console.error("Error fetching EDI standard:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.createEdiStandard = async (req, res) => {
    try {
        const data = await validateRequestAttributes(req.body, EdiStandard);
        const newEdiStandard = await EdiStandard.create( data );
        res.status(201).json(newEdiStandard);
    } catch (err) {
        console.error("Error creating EDI standard:", err);
        res.status(500).json({ error: "Internal server error", code: 500, details: err.message });
    }
};

exports.updateEdiStandard = async (req, res) => {
    try {
        const { name, identifier } = req.body;
        const ediStandard = await EdiStandard.findByPk(req.params.id);
        if (!ediStandard) {
            return res.status(404).json({ error: "EDI Standard not found" });
        }
        ediStandard.name = name ?? ediStandard.name;
        ediStandard.identifier = identifier ?? ediStandard.identifier;
        await ediStandard.save();
        res.json(ediStandard);
    } catch (err) {
        console.error("Error updating EDI standard:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteEdiStandard = async (req, res) => {
    try {
        const ediStandard = await EdiStandard.findByPk(req.params.id);
        if (!ediStandard) {
            return res.status(404).json({ error: "EDI Standard not found" });
        }
        await ediStandard.destroy();
        res.json({ message: "EDI Standard deleted successfully" });
    } catch (err) {
        console.error("Error deleting EDI standard:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
