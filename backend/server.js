const path = require("path");

// Load environment variables from backend/.env
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = require("./app");
const config = require("./config/env");

const server = app.listen(config.port, () => {
  console.log(
    `Teamflow API running on http://localhost:${config.port}`
  );
  console.log(`Environment: ${config.nodeEnv}`);
});

// Handle unexpected server errors.
server.on("error", (error) => {
  console.error("Server startup error:", error.message);
  process.exit(1);
});
