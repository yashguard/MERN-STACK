const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/product.controllers");
const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/product/new", createProduct);
productRouter.patch("/product/:id", updateProduct).delete("/product/:id", deleteProduct).get("/product/:id", getProduct);

module.exports = productRouter;
