// To Start the Server
const app = require("./app")
const connectDatabase = require("./config/database")

const dotenv = require("dotenv")

//load env variable
dotenv.config({path: "./config/config.env"})

//connect to db
connectDatabase()

PORT = process.env.PORT

 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 