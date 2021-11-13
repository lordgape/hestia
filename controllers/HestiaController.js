const HestiaService = require("../services/HestiaService");
const ControllerUtil = require("../utils/ControllerUtil");

module.exports = class Controller {
  static async ping(req, res) {
    try {
      return res.json(await HestiaService.ping());
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, res);
    }
  }

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
      return ControllerUtil.sendErrorResponse(error, res);
    }
  }
};
