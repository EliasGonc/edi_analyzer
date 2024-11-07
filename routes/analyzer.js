const express = require("express");
const analyzerController = require("../controllers/analyzer");

const router = express.Router();

router.get("/analyzer-options", analyzerController.getAnalyzerOptions);
router.post("/analyze-message", analyzerController.analyzeMessage);

module.exports = router;