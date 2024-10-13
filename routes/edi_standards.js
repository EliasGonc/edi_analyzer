const express = require("express");
const ediStandardController = require("../controllers/edi_standards");

const router = express.Router();

router.get("/edi-standards", ediStandardController.getAllEdiStandards);
router.get("/edi-standards/:id", ediStandardController.getEdiStandardById);
router.post("/edi-standards", ediStandardController.createEdiStandard);
router.put("/edi-standards/:id", ediStandardController.updateEdiStandard);
router.delete("/edi-standards/:id", ediStandardController.deleteEdiStandard);

module.exports = router;