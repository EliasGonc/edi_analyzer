const { DataElement } = require("../models/associations");
const { createWhereClause } = require("./helper_functions");

exports.getDataElements = async (req, res) => {
    try {
        const dataElements = await DataElement.findAll({
            where: createWhereClause(req.query, DataElement)
        });
        res.status(200).json(dataElements);
    } catch (err) {
        console.error("Error fetching data elements: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getDataElementById = async (req, res) => {
    try {
        const dataElement = await DataElement.findOne({
            where: { id: req.params.id },
        });
        if (!dataElement) {
            return res.status(404).json({ error: "Data element not found" });
        }
        res.status(200).json(dataElement);
    } catch (err) {
        console.error("Error fetching data element: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createDataElement = async (req, res) => {
    try {
        const dataElement = await DataElement.create(req.body);
        res.status(201).json(dataElement);
    } catch (error) {
        console.error("Error creating data element: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateDataElement = async (req, res) => {
    try {
        const [updated] = await DataElement.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            return res.status(404).json({ error: "Data element not found" });
        }
        const updatedDataElement = await DataElement.findOne({ where: { id: req.params.id } });
        res.status(200).json(updatedDataElement);
    } catch (err) {
        console.error("Error updating data element: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteDataElement = async (req, res) => {
    try {
        const deleted = await DataElement.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ error: "Data element not found" });
        }
        res.status(204).json();
    } catch (err) {
        console.error("Error deleting data element: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
