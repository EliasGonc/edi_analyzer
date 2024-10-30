const express = require("express");
const ediMessageContentsController = require("../controllers/edi_message_content");

const router = express.Router();

router.get("/messages-segments", ediMessageContentsController.getEdiMessageContents);

module.exports = router;