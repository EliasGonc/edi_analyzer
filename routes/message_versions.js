const express = require("express");
const messageVersionController = require("../controllers/message_versions");

const router = express.Router();

router.get("/message-versions", messageVersionController.getMessageVersions);
router.get("/message-versions/:id", messageVersionController.getMessageVersionById);
router.post("/message-versions", messageVersionController.createMessageVersion);
router.put("/message-versions/:id", messageVersionController.updateMessageVersion);
router.delete("/message-versions/:id", messageVersionController.deleteMessageVersion);

module.exports = router;