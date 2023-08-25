const catchAsyncError = (theFunction) => (req, res, next) => {
  Promise.resolve(theFunction(req, res, next)).catch((err) => console.log(err));
};

module.exports = catchAsyncError;
