const user = require("../models/userSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.User = await user.findById(decodedData.id);

  next();
});

const authorizqRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.User.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.User.role} is not allowed to access this resource`, 403
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizqRoles };
