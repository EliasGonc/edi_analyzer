const express = require("express");
const segmentContentController = require("../controllers/segment_contents");

const router = express.Router();

router.get("/segment-contents", segmentContentController.getSegmentContents);

module.exports = router;