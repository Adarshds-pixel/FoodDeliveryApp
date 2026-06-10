const mongoose = require('mongoose')
const validator = require("validator")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userschema = mongoose.schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxlength:[30,"Max length is 30 characters"]

    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:[true,"Email already registered"],
        validate:[validator.isEmail,"Please enter a valid email"],
        lowercase:true
    },
    password:{
        type:string,
        required:[true,"Please enter your password"],
        minlength:[8,"Password must be atleast 8 characters"],
        select:false
    },
    confirmPassword:{
        type:string,
        required:[true,"Please confirm your password"],
        validate:{
            validator: function(value){
                value === this.password
            },
            message="Password and confirm password should be same"
        }
    },
    phonenumber:{
        type:string,
        required:true,
        match:[/^{0-9}{10}$/, "Enter valid phone number"]

    },
    role:{
        type:string,
        enum:["user","admin"],
        default:"user"
    }
})