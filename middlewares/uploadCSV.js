const multer = require("multer");
const AppErrors = require("../models/AppError");
const ResponseCode = require("../models/ResponseCode");

// Filter for CSV file
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb(
      new AppErrors(400, ResponseCode.FAILED, `Please upload only csv file.`),
      false
    );
  }
};

const upload = multer({ fileFilter });

module.exports.upload = upload;
