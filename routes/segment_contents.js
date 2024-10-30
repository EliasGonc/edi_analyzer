const express = require("express");
const segmentContentsController = require("../controllers/segment_contents");

const router = express.Router();

router.get("/segment-contents", segmentContentsController.getSegmentContents);

module.exports = router;