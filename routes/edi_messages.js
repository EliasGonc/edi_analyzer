const express = require("express");
const ediMessageController = require("../controllers/edi_messages");

const router = express.Router();

router.get("/edi-messages", ediMessageController.getEdiMessages);
router.get("/edi-messages/:id", ediMessageController.getEdiMessageById);
// router.post("/edi-messages", ediMessageController.createEdiMessage);
// router.put("/edi-messages", ediMessageController.updateEdiMessage);
// router.delete("/edi-messages", ediMessageController.deleteEdiMessage);

module.exports = router;