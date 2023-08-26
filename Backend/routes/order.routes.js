const { Router } = require("express");
const {
  newOrder,
  getSingleOrders,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrderStatus,
} = require("../controllers/order.controller");
const {
  isAuthenticated,
  authorizqRoles,
} = require("../middleware/authentication");
const orderRouter = Router();

orderRouter.post("/new", isAuthenticated, newOrder);
orderRouter.get("/singleorder/:id", isAuthenticated, getSingleOrders);
orderRouter.get("/myorder/details", isAuthenticated, myOrders);
orderRouter.get(
  "/admin/list",
  isAuthenticated,
  authorizqRoles("admin"),
  getAllOrders
);

orderRouter
  .patch(
    "/admin/order/:id",
    isAuthenticated,
    authorizqRoles("admin"),
    updateOrderStatus
  )
  .delete(
    "/admin/order/:id",
    isAuthenticated,
    authorizqRoles("admin"),
    deleteOrderStatus
  );

module.exports = orderRouter;
