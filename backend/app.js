// To configure Express and Midlleware
//Config Middleware
//Middleware is a function that is executed between request and response. It can be used to modify the request and response objects, or to perform some action before the request is handled by the route handler.
//req=> middlware => route=> response
const express = require ("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json()) // To parse JSON data from the request body

module.exports = app