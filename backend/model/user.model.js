const { default: mongoose } = require("mongoose");


const userSchema=mongoose.Schema({
    email:String,
    pass:String,
    location:String
},{versionKey:false})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}