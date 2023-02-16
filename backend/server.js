//importing app which is exported from server side app.js
const app =require('./app')

//error handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`error: ${err.message}`)
    console.log('shutting down the server due to uncaught exception')
    process.exit(1)
})

//dotenv is used to get path of config.env file to the process.env
const dotenv = require('dotenv')
dotenv.config({path: "backend/config/config.env"})

//call connectDatabase function
const connectDatabase = require("./config/database")
connectDatabase()

//create server
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

//error handling unhandled promise rejection
process.on("unhandledRejection",err =>{
    console.log(`Error: ${err.message}`)
    console.log('shutting down the server due to unhandled promise rejection')
    server.close(()=>{
        process.exit(1)
    })
})