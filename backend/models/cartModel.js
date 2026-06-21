const mongoose = require('mongoose')
const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    items:[{
        foodItem:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"FoodItem",
            required:true
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const cart =mongoose.model("Cart",cartSchema)
exports.model=cart