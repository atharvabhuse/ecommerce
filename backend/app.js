//import express module
const express =require('express')

//create express application instance or example
const app = express()

const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const cookiePaser = require("cookie-parser")

// const dotenv = require('dotenv')
if(process.env.NODE_ENV !== "PRODUCTION"){
require('dotenv').config({path: 'backend/config/config.env'})
}

const path = require("path");

// const fileUpload = require("express-fileupload");
// const path = require("path")


//middleware for errors
const errorMiddleware = require("./middleware/error")


//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require('./routes/paymentRoute')


//it is used to parse request body
app.use(express.json())
app.use(cookiePaser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())


app.use(bodyParser.json())


//it is used to mount product the product router at the specified path '/api/v1' in express application
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1",order)
app.use('/api/v1',payment)

//middleware for errors
app.use(errorMiddleware)

//export app instance to make accessible to other part of program
module.exports = app