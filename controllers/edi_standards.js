// const EdiStandard = require("../models/edi_standard");
const { EdiStandard } = require("../models/associations");

exports.getAllEdiStandards = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            res.json(await EdiStandard.findAll());
        } else {
            res.json(await EdiStandard.findAll({
                where: {
                    name: name
                }
            }));
        }
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
        const { name, identifier } = req.body;
        const newEdiStandard = await EdiStandard.create({ name, identifier });
        res.status(201).json(newEdiStandard);
    } catch (err) {
        console.error("Error creating EDI standard:", err);
        res.status(500).json({ error: "Internal server error" });
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
