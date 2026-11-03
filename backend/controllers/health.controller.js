const { getHealthStatus } = require("../services/health.service");

const getHealth = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Teamflow API is running smoothly!",
    data: getHealthStatus(),
  });
};

module.exports = { getHealth };
