const mongoose = require("mongoose");

const getHealth = (req, res) => {
  const databaseStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const databaseStatus =
    databaseStates[mongoose.connection.readyState] || "unknown";

  res.status(200).json({
    status: "success",
    message: "Teamflow API is running.",
    data: {
      application: "running",
      uptime: Number(process.uptime().toFixed(2)),
      database: databaseStatus,
    },
  });
};

module.exports = {
  getHealth,
};
