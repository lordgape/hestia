const HestiaService = require("../services/HestiaService");
const ErrorUtil = require("../utils/ErrorUtil");

module.exports = class Controller {
  static async pivotCSV(req, res) {
    try {
      const transformedCSV = await HestiaService.pivotCSV(req.file.buffer);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=transformedCSV.csv"
      );

      return res.status(200).end(transformedCSV);
    } catch (error) {
      return ErrorUtil.sendErrorResponse(error, res);
    }
  }
};
