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
  let displayProducts = 8;
  let countProduct = await product.count();
  let apiFeatures = new ApiFeatures(product.find(), req.query)
    .search()
    .filter()
    .paginations(displayProducts);
  let products = await apiFeatures.query;
  res.status(200).json({ success: true, countProduct, products });
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
  if (!getProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, getProduct });
});

// Create review or update the review
const createReview = catchAsyncError(async (req, res) => {
  let { productId, rating, comment } = req.body;

  const review = {
    user: req.User._id,
    name: req.User.name,
    rating: Number(rating),
    comments: comment,
  };

  let getProduct = await product.findById(productId);

  let isReviewed = getProduct.reviews.find((rev) => {
    rev.user.toString() === req.User.id.toString();
  });

  if (isReviewed) {
    getProduct.reviews.forEach((rev) => {
      if (rev.user.toString() === req.User.id.toString()) {
        rev.rating = rating;
        rev.comments = comment;
      }
    });
  } else {
    getProduct.reviews.push(review);
    getProduct.numOfReviews = getProduct.reviews.length;
  }

  let average = 0;

  getProduct.reviews.forEach((rev) => {
    average += rev.rating;
  });

  getProduct.ratings = average / getProduct.reviews.length;

  await getProduct.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get product reviews
const getProductReview = catchAsyncError(async (req, res, next) => {
  const getProduct = await product.findById(req.query.id);

  if (!getProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: getProduct.reviews,
  });
});

// Delete reviews
const deleteReview = catchAsyncError(async (req, res, next) => {
  const getProduct = await product.findById(req.query.productId);

  if (!getProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let reviews = getProduct.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  let average = 0;

  reviews.forEach((rev) => {
    average += rev.rating;
  });

  let ratings = average / reviews.length;

  let numOfReviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createReview,
  getProductReview,
  deleteReview,
};
