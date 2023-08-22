const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/product.controllers");
const router = Router();

router.get("/products", getProducts);
router.post("/product/new", createProduct);
router.patch("/product/:id", updateProduct).delete("/product/:id", deleteProduct).get("/product/:id", getProduct);

module.exports = router;
