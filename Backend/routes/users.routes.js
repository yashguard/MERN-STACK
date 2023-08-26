const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser
} = require("../controllers/user.controllers");
const { isAuthenticated, authorizqRoles } = require("../middleware/authentication");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/password/reset", forgetPassword);
userRouter.patch("/password/reset/:token", resetPassword);
userRouter.get("/aboutme", isAuthenticated, userDetails);
userRouter.patch("/admin/password/update", isAuthenticated, updatePassword);
userRouter.patch("/admin/updateprofile", isAuthenticated, updateProfile);
userRouter.get("/admin/usersdetails", isAuthenticated, authorizqRoles("admin"), getAllUsers);
userRouter.get("/admin/userdetails/:id", isAuthenticated, authorizqRoles("admin"), getUser);
userRouter.patch("/admin/role/:id", isAuthenticated,authorizqRoles("admin"), updateUserRole);
userRouter.delete("/admin/remove/:id", isAuthenticated,authorizqRoles("admin"), deleteUser);

module.exports = userRouter;
