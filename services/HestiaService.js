const { spawn } = require("child_process");
const { randomBytes } = require("crypto");
const fs = require("fs");
const AppErrors = require("../models/AppError");
const ResponseCode = require("../models/ResponseCode");
const { unlink } = fs.promises;

module.exports = class HestiaService {
  static pivotCSV(buffer) {
    return new Promise(async (resolve, reject) => {
      let scriptResponse = [];

      const FILENAME =
        "sample.csv" + Date.now() + randomBytes(6).toString("hex");

      console.log(FILENAME);

      const writeStream = fs.createWriteStream(FILENAME);

      writeStream.write(buffer, (err) => {
        if (err) {
          console.log(`Error writing  ${JSON.stringify(err)}`);
        }
      });

      // Spawn new child process to call the python script
      const python = spawn("python3", ["hestia.py", FILENAME]);

      // Collect data from script
      python.stdout.on("data", (data) => {
        console.log(`Pipe data from python script ...`);
        scriptResponse.push(data.toString());
      });

      // Clean up
      python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code} `);

        // clean up tmp file
        unlink(FILENAME);

        // code with integer greater than zero. Indicate some went wrong
        if (code) {
          reject(
            new AppErrors(
              400,
              ResponseCode.FAILED,
              `Fail to process file. Ensure csv is in right format`
            )
          );
        } else {
          // Send data to browser
          resolve(scriptResponse.join(""));
        }
      });
    });
  }
};
