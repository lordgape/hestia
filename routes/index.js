const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const hestiaRoute = require("./api/hestiaRoute");

const route = (app) => {
  
  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: "Hestia API",
        version: "1.0",
      },
    },
    // eslint-disable-next-line no-undef
    apis: [__filename, path.join(__dirname, "/api/hestiaRoute.js")],
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/api", hestiaRoute);

  /**
   * @swagger
   * /:
   *   get:
   *     description: Health Server Check
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success message if server is in good health
   *       404:
   *         description: Not Found
   */
  app.use((req, res) => {
    if (req.url == "/") {
      return res.json({
        code: "SUCCESS",
        response: `Hestia Server is in good health`,
      });
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
