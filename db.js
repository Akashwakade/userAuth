const mongoose=require("mongoose")
require('dotenv').config()
 

const connection=mongoose.connect(process.env.db) //local mongo


module.exports={
    connection
}