const model = require("../models/products.schema");

// Create Product ==> Admin
const createProduct = async (req, res) => {
  try {
    let product = await model.create(req.body);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
  }
};

// Update Product ==> Admin
const updateProduct = async (req, res) => {
  try {
    let product = await model.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "Product not found" });
    }
    product = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
  }
};

// Delete Product ==> Admin
const deleteProduct = async (req, res) => {
  try {
    let product = await model.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "Product not found" });
    }
    product = await model.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// Get Product Details As Per Id
const getProduct = async (req, res) => {
  try {
    let product = await model.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
  }
};

// Get Products ==> User
const getProducts = async (req, res) => {
  try {
    let products = await model.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
