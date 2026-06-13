const express = require("express")
const router = express.Router()
const authController = require("../controllers/AuthController")

//signup
router.post("/signup", authController.signup)
module.exports = router