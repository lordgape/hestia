const cache = require("memory-cache");
const crypto = require("crypto");

// configure cache middleware
const memCache = new cache.Cache();

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const cloneHash = crypto
      .createHash("md5")
      .update(req.file.buffer)
      .digest("hex");

    let key = "__express__" + cloneHash;

    let cacheContent = memCache.get(key);
    if (cacheContent) {
      console.log("cache hit");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=transformedCSV.csv"
      );
      res.end(cacheContent);
      return;
    } else {
      res.sendResponse = res.end;
      res.end = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports.cacheMiddleware = cacheMiddleware;
