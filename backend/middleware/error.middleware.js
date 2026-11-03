const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message:
      statusCode === 500
        ? "Something went wrong. Please try again later."
        : err.message,
  });
};

module.exports = errorMiddleware;
