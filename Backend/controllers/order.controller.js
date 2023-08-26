const order = require("../models/order.schema");
const product = require("../models/products.schema");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// creating an orders
const newOrder = catchAsyncError(async (req, res, next) => {
  const Order = await order.create({
    ...req.body,
    paidAt: Date.now(),
    user: req.User._id,
  });

  res.status(201).json({
    success: true,
    Order,
  });
});

module.exports = { newOrder };
