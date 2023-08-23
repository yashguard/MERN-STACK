const catchAsyncError = require("../middleware/catchAsyncErrors");
const model = require("../models/products.schema");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorhandler");

// Create Product ==> Admin
const createProduct = catchAsyncError(async (req, res) => {
  let product = await model.create(req.body);
  res.status(200).json({ success: true, product });
});

// Update Product ==> Admin
const updateProduct = catchAsyncError(async (req, res) => {
  let product = await model.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, product });
});

// Delete Product ==> Admin
const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await model.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await model.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// Get Product Details As Per Id
const getProduct = catchAsyncError(async (req, res, next) => {
  let product = await model.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

// Get Products ==> User
const getProducts = catchAsyncError(async (req, res) => {
  let apiFeatures = new ApiFeatures(model.find(), req.query).search().filter();
  let products = await apiFeatures.query;
  res.status(200).json({ success: true, products });
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
