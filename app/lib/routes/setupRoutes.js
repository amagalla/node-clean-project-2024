const fs = require("fs");
const path = require("path");

function setupRoutes(app) {
  const apiRoutesDir = path.join(__dirname, "api");

  // Read the files in the directory
  fs.readdirSync(apiRoutesDir).forEach((file) => {
    if (file.endsWith(".js")) {
      const routePath = path.join(apiRoutesDir, file);
      const route = require(routePath);

      const routeName = path.basename(routePath, ".js");

      app.use(`/api/${routeName}`, route);
    }
  });
}

module.exports = setupRoutes;
