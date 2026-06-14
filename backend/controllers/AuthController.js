const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const cloudinary = require("../config/cloudinary");

//Signup
exports.signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, phoneNumber } = req.body;

  let avatar = [];
  //avatar not provided
  if(!req.body.avatar || req.body.avatar.length === "/images/images.png"){
    avatar = {
        public_id: "default",
        url: "/images/images.png"
    }
  }
  else {
    const result = await cloudinary.uploadStream(req.body.avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale"
    })
    avatar = {
      public_id: result.public_id,
      url: result.secure_url
    }
  }

  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    avatar
  });

  sendToken(user, 201, res);
});

//login
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
   
  //checking if user has given both email and password
  if(!email || !password){
    return next(new ErrorHandler("Please enter email and password", 400))
  }

  const user =await User.findOne({ email }).select("+password");

  //if user not found
  if(!user){
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //check if password is correct
  const isPasswordMatched = await user.correctPassword(password,user.password);
  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
})

