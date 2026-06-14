const mongoose = require("mongoose")
const validator = require("validator")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// SCHEMA

const userSchema = mongoose.Schema({
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
        type:String,
        required:[true,"Please enter your password"],
        minlength:[8,"Password must be atleast 8 characters"],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,"Please confirm your password"],
        validate:{
            validator: function(value){
                return value === this.password
            },
            message:"Password and confirm password should be same"
        }
    },
    phoneNumber:{
        type:String,
        required:true,
        match:[/^[0-9]{10}$/, "Enter valid phone number"]

    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    avatar:{
        public_id:String,
        url:String
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetTokenExpire:Date
},
{timestamps:true}
)

//hash password
//pre("save") is a mongoose middleware that is executed before saving the document to the database. It is used to perform some action before saving the document, such as hashing the password before saving it to the database.

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined
})

//password compare at login time

userSchema.methods.correctPassword = async function(enteredPassword, registeredPassword){
    return await bcrypt.compare(enteredPassword, registeredPassword);
}
//checks whether user password is changed after the token is issued, If yes then the token is invalid and user needs to login again to get a new token

userSchema.methods.passwordChangedAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10)
        return JWTTimestamp < changedTimestamp 
    }
    return false
}

//Custom method to generate JWT token for user
userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE}
    )
}

module.exports = mongoose.model("User", userSchema)

