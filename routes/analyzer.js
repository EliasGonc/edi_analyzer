const express = require("express");
const analyzerController = require("../controllers/analyzer");

const router = express.Router();

router.post("/analyze-message", analyzerController.analyzeMessage);

module.exports = router;