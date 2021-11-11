const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const HestiaController = require("../../controllers/HestiaController");

/**
 * @route api/ping
 * @desc Check api health
 * @access Public
 */

router.get("/ping", (req, res) => {
  return HestiaController.ping(req, res);
});

/**
 * @route api/test
 * @desc Check api health
 * @access Public
 */

router.post("/test", upload.single("uploadCsv"), (req, res) => {
  return HestiaController.ping(req, res);
});

/**
 * @route api/hestia
 * @desc Pivot a CSV
 * @access Public
 */

router.post("/pivot", upload.single("uploadCsv"), (req, res) => {
  return HestiaController.pivotCSV(req, res);
});

module.exports = router;
