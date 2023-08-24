const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/product.controllers");
const isAuthenticated = require("../middleware/authentication");
const productRouter = Router();

productRouter.get("/", isAuthenticated, getProducts);
productRouter.post("/product/new", createProduct);
productRouter
  .patch("/product/:id", updateProduct)
  .delete("/product/:id", deleteProduct)
  .get("/product/:id", getProduct);

module.exports = productRouter;
