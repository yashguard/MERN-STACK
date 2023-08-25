const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  userDetails,
  updatePassword
} = require("../controllers/user.controllers");
const { isAuthenticated } = require("../middleware/authentication");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/password/reset", forgetPassword);
userRouter.patch("/password/reset/:token", resetPassword);
userRouter.get("/aboutme", isAuthenticated, userDetails);
userRouter.patch("/password/update", isAuthenticated, updatePassword);

module.exports = userRouter;
