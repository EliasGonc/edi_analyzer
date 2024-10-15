const express = require("express");
const segmentController = require("../controllers/segments");

const router = express.Router();

router.get("/segments", segmentController.getAllSegments);
router.get("/segments/:id", segmentController.getSegmentById);
router.post("/segments", segmentController.createSegment);
router.put("/segments/:id", segmentController.updateSegment);
router.delete("/segments/:id", segmentController.deleteSegment);

module.exports = router;