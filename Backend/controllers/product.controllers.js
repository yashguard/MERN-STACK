const product = require("../models/products.schema");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// Create Product ==> Admin
const createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.User._id;
  let getProduct = await product.create(req.body);
  res.status(200).json({ success: true, getProduct });
});

// Get Products ==> User
const getProducts = catchAsyncError(async (req, res) => {
  let displayProducts = 5;
  let apiFeatures = new ApiFeatures(product.find(), req.query)
    .search()
    .filter()
    .paginations(displayProducts);
  let products = await apiFeatures.query;
  res.status(200).json({ success: true, products });
});

// Update Product ==> Admin
const updateProduct = catchAsyncError(async (req, res, next) => {
  let getProduct = await product.findById(req.params.id);
  if (!getProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  getProduct = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, getProduct });
});

// Delete Product ==> Admin
const deleteProduct = catchAsyncError(async (req, res, next) => {
  let getProduct = await product.findById(req.params.id);
  if (!getProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  getProduct = await product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// Get Product Details As Per Id
const getProduct = catchAsyncError(async (req, res, next) => {
  let getProduct = await product.findById(req.params.id);
  // let countProduct = product.countDocuments();
  if (!getProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, getProduct });
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
