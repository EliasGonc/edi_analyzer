const express = require("express");
const messageContentController = require("../controllers/message_contents");

const router = express.Router();

router.get("/message-contents", messageContentController.getMessageContents);

module.exports = router;