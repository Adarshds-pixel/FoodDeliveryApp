const express = require("express")
const router = express.Router()
const restaurantController = require("../controllers/restaurantController")

router.route("/").get(restaurantController.getAllRestaurants)
router.route("/:storeId").get(restaurantController.getRestaurant)

module.exports = router