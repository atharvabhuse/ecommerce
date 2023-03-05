//import mongoose
//DB_URI=mongodb://localhost:27017/Ecommerce
//DB_URI=mongodb+srv://atharva:atharva@ecommerce.jvf3lbg.mongodb.net/Ecommerce?retryWrites=true&w=majority
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
