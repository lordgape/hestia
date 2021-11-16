const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const HestiaController = require("../../controllers/HestiaController");

/**
 * @swagger
 * /api/pivot:
 *    post:
 *     description: Pivot a CSV
 *     produces:
 *       - text/csv 
 *     parameters:
 *       - name: uploadCsv
 *         in: formData
 *         description: 'Key for uploading csv'
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Pivot a CSV using Hestia tools
 *       404:
 *         description: Not Found
 */
router.post("/pivot", upload.single("uploadCsv"), (req, res) => {
  return HestiaController.pivotCSV(req, res);
});

module.exports = router;
