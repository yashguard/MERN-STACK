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

// Get single order details
const getSingleOrders = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id);

  if (!Order) {
    return next(
      new ErrorHandler(`Order not found with given id ${req.params.id}`, 404)
    );
  }

  res.status(201).json({
    success: true,
    Order,
  });
});

// Get logged in user order
const myOrders = catchAsyncError(async (req, res) => {
  const Order = await order.find({ user: req.User._id });

  res.status(201).json({
    success: true,
    Order,
  });
});

// Get all orders
const getAllOrders = catchAsyncError(async (req, res) => {
  const Order = await order.find();

  let totalAmount = 0;

  Order.forEach((orders) => {
    totalAmount += orders.totalPrice;
  });

  res.status(201).json({
    success: true,
    totalAmount,
    Order,
  });
});

// Update order status
const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id);

  if (!Order) {
    return next(
      new ErrorHandler(`Order not found with given id ${req.params.id}`, 404)
    );
  }

  if (Order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }

  Order.orderItems.forEach(async (order) => {
    return updateStock(order.product, order.qty);
  });

  Order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    Order.delivered = Date.now();
  }

  await Order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
  });
});

// Delete order status
const deleteOrderStatus = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id);

  if (!Order) {
    return next(
      new ErrorHandler(`Order not found with given id ${req.params.id}`, 404)
    );
  }

  await order.findByIdAndDelete(req.params.id);

  res.status(201).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getSingleOrders,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrderStatus,
};

async function updateStock(id, quantity) {
  const Product = await product.findById(id);

  Product.stock -= quantity;

  await Product.save({ validateBeforeSave: false });
}
