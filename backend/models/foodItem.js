const mongoose = require("mongoose");
const menu = require("./menu");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Food item name is required"],
        maxlength: [100, "Food item name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Food item description is required"]
    },
    price: {
        type: Number,
        maxlength: [8, "Food item price cannot exceed 8 digits"],
        default: 0.0,
        required: [true, "Food item price is required"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
    },
    stock: {
        type: Number,
        required: [true, "Food item stock is required"],
        maxlength: [5, "Food item stock cannot exceed 5 digits"],
        default: 0
    },
    restaurant: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
        reviews:[{
        name:{
            type:"String",
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:"String",
            required:true
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("FoodItem", foodSchema);