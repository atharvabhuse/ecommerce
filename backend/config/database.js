//import mongoose
const mongoose =require('mongoose')

//connect to database
const connectDatabase=( )=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((data)=>{
        console.log(`Mongo connected with server: ${data.connection.host}`)
    })
}

//export connectDatabase function
module.exports = connectDatabase
