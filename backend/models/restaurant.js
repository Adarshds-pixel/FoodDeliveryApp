const { createDecipheriv } = require("crypto")
const mongoose = require("mongoose")
const { createDeflate } = require("zlib")

const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter restaurant name"],
        maxlength:[50,"Max length is 50 characters"]
    },
    isVeg:{
        type:Boolean,
        default:false
    },
    address:{
        type:"String",
        required:[true,"Please enter restaurant address"]

    },
    reviews:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    Location:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
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

})

restaurantSchema.index({ Location: "2dsphere" })
restaurantSchema.index({address:"text"})

module.exports = mongoose.model("Restaurant",restaurantSchema)