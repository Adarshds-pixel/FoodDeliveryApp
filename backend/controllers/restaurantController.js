const Restaurant = require("../models/restaurant");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const apiFeatures = require("../utils/apiFeatures");

//get All restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) =>{
    const apiFeature = new apiFeatures(Restaurant.find(), req.query).search().sort().filter().pagination(10);
    const restaurants = await apiFeature.query;
    res.status(200).json({
        success:true,
        count:restaurants.length,
        restaurants:restaurants
    })
    

})