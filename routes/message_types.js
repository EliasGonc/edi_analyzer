const express = require("express");
const messageTypeController = require("../controllers/message_types");

const router = express.Router();

router.get("/message-types", messageTypeController.getAllMessageTypes);
router.get("/message-types/:id", messageTypeController.getMessageTypeById);
router.post("/message-types", messageTypeController.createMessageType);
router.put("/message-types/:id", messageTypeController.updateMessageType);
router.delete("/message-types/:id", messageTypeController.deleteMessageType);

module.exports = router;