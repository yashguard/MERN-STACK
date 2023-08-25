const ErrorHandler = require("../utils/errorhandler");

const errorFunction = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource has not been founded. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token has been entered, try again`;
    err = new ErrorHandler(message, 400);
  }

  // Jwt expire error
  if (err.name === "TokenExpiresError") {
    const message = `Invalid token has been expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};

module.exports = errorFunction;
