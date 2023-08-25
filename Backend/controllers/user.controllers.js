const catchAsyncError = require("../middleware/catchAsyncErrors");
const user = require("../models/userSchema");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jstToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
require("dotenv").config();

// Sign up user
const registerUser = catchAsyncError(async (req, res) => {
  let { name, email, password } = req.body;

  const User = await user.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is my sample id",
      url: "ProfilePicUrl",
    },
  });
  sendToken(User, 201, res);
});

// Login user
const loginUser = catchAsyncError(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 400));
  }

  const User = await user.findOne({ email }).select("+password");

  if (!User) {
    return next(
      new ErrorHandler("Please enter a valid email or password", 401)
    );
  }

  const comparePasssword = await User.comparePasssword(password);

  if (!comparePasssword) {
    return next(
      new ErrorHandler("Please enter a valid email or password", 401)
    );
  }
  sendToken(User, 200, res);
});

// Logout user
const logoutUser = catchAsyncError(async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(201).json({
    success: true,
    message: "User logged out successfully",
  });
});

// Forgot Password
const forgetPassword = catchAsyncError(async (req, res, next) => {
  let User = await user.findOne({ email: req.body.email });

  if (!User) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  let resetToken = User.getResetPasswordToken();

  await User.save({ validateBeforeSave: false });

  let url = `${req.protocol}://${req.get(
    "host"
  )}/user/password/reset/${resetToken}`;

  let message = `Your password token is :- \n\n ${url} \n\n If you have not requested this email then, ignore this email.`;

  try {
    await sendEmail({
      email: User.email,
      subject: "Ecommercer Password Recovery Process",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${User.email} successfully`,
    });
  } catch (error) {
    User.resetPasswordToken = undefined;
    User.resetPasswordExpired = undefined;

    await User.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
const resetPassword = catchAsyncError(async (req, res, next) => {
  let resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  let User = await user.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() },
  });

  if (!User) {
    return next(
      new ErrorHandler("Reset password is invalid or has been expires", 400)
    );
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  User.password = req.body.password;
  User.resetPasswordToken = undefined;
  User.resetPasswordExpired = undefined;

  await User.save();

  sendToken(User, 200, res);
});

// Get User Details
const userDetails = catchAsyncError(async (req, res) => {
  let User = await user.findById(req.User.id);

  res.status(200).json({ success: true, User });
});

// Update Password
const updatePassword = catchAsyncError(async (req, res, next) => {
  let User = await user.findById(req.User.id).select("+password");

  let isPasswordMatched = await User.comparePasssword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(
        "Your old password is incorrect, please enter correct password",
        400
      )
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  User.password = await req.body.newPassword;

  await User.save();

  sendToken(User, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  userDetails,
  updatePassword,
};
