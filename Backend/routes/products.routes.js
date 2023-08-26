const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createReview,
} = require("../controllers/product.controllers");
const {
  isAuthenticated,
  authorizqRoles,
} = require("../middleware/authentication");
const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post(
  "/product/new",
  isAuthenticated,
  authorizqRoles("admin"),
  createProduct
);
productRouter
  .patch(
    "/product/:id",
    isAuthenticated,
    authorizqRoles("admin"),
    updateProduct
  )
  .delete(
    "/product/:id",
    isAuthenticated,
    authorizqRoles("admin"),
    deleteProduct
  )
  .get("/product/:id", getProduct);

  productRouter.patch("/review", isAuthenticated ,createReview)

module.exports = productRouter;
