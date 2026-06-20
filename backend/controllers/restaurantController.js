const Restaurant = require("../models/restaurant");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const apiFeatures = require("../utils/apiFeatures");

// Get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
    const apiFeature = new apiFeatures(Restaurant.find(), req.query)
        .search()
        .sort()
        .filter()
        .pagination(10);

    const restaurants = await apiFeature.query;

    res.status(200).json({
        success: true,
        count: restaurants.length,
        restaurants: restaurants
    });
});

// Get restaurant by ID
exports.getRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.storeId);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
        success: true,
        restaurant: restaurant
    });
});