const router = require("express").Router();

const HestiaController = require("../../controllers/HestiaController");
const { cacheMiddleware } = require("../../middlewares/cacheMiddleware");
const { upload } = require("../../middlewares/uploadCSV");

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
 *       400:
 *         description: Bad Request
 */
router.post(
  "/pivot",
  [upload.single("uploadCsv"), cacheMiddleware(30)],
  (req, res) => {
    return HestiaController.pivotCSV(req, res);
  }
);

module.exports = router;
