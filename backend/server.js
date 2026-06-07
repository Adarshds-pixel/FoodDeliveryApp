// To Start the Server
const app = require("./app")
const dotenv = require("dotenv")
dotenv.config({path: "./config/config.env"})

PORT = process.env.PORT

 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 