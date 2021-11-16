const express = require("express");
const multer = require('multer');

const app = express();

//Set up port
const PORT = global.process.env.PORT || 4000;

const route = require("./routes");
route(app);


app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
