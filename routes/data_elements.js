const express = require("express");
const dataElementController = require("../controllers/data_elements");

const router = express.Router();

router.get("/data-elements", dataElementController.getAllDataElements);
router.get("/data-elements/:id", dataElementController.getDataElementById);
router.post("/data-elements", dataElementController.createDataElement);
router.put("/data-elements/:id", dataElementController.updateDataElement);
router.delete("/data-elements/:id", dataElementController.deleteDataElement);

module.exports = router;