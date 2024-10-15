const { Segment } = require("../models/associations");
const { createWhereClause } = require("./helper_functions");

exports.getAllSegments = async (req, res) => {
    try {
        const segments = await Segment.findAll({
            include: [
                { model: Segment, as: "parent_segment" },  // Include the parent segment
                { model: Segment, as: "sub_segments" }      // Include any subsegments
            ],
        });
        res.status(200).json(segments);
    } catch (err) {
        console.error("Error fetching segments:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getSegmentById = async (req, res) => {
    try {
        const segment = await Segment.findOne({
            where: { id: req.params.id },
            include: [
                { model: Segment, as: "parent_segment" },
                { model: Segment, as: "sub_segments" }
            ],
        });
        if (!segment) {
            return res.status(404).json({ error: "Segment not found" });
        }
        res.status(200).json(segment);
    } catch (err) {
        console.error("Error fetching segment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createSegment = async (req, res) => {
    try {
        const segment = await Segment.create(req.body);
        res.status(201).json(segment);
    } catch (err) {
        console.error("Error creating segment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateSegment = async (req, res) => {
    try {
        const [updated] = await Segment.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            return res.status(404).json({ error: "Segment not found" });
        }
        const updatedSegment = await Segment.findOne({ where: { id: req.params.id } });
        res.status(200).json(updatedSegment);
    } catch (err) {
        console.error("Error updating segment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteSegment = async (req, res) => {
    try {
        const deleted = await Segment.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ error: "Segment not found" });
        }
        res.status(204).json();
    } catch (err) {
        console.error("Error deleting segment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
