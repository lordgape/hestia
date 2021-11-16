const express = require("express");

const app = express();

// Setup middlewares
require("./middlewares")(app);

// Setup Routes
const route = require("./routes");
route(app);

// Bootstrap server
const PORT = global.process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
