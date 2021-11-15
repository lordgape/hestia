const hestiaRoute = require("./api/hestiaRoute");

const route = (app) => {
  app.use("/api", hestiaRoute);

  app.use((req, res) => {
    if (req.url == "/") {
      return res.json({ code: "SUCCESS", response: `Hesta Server is in good health` });
    }

    // respond with json
    if (req.accepts("json")) {
      res.json({
        code: "Not_found",
        response: "",
        error: "Resource not found",
      });
      return;
    }

    // default to plain-text. send()
    res.type("txt").send("Not found");
  });
};

module.exports = route;
