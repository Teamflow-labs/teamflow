const mongoose = require("mongoose");

const getHealthStatus = () => {
  const databaseStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return {
    application: "running",
    uptime: Number(process.uptime().toFixed(2)),
    database:
      databaseStates[mongoose.connection.readyState] || "unknown",
  };
};

module.exports = { getHealthStatus };
