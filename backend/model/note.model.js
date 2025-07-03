const { default: mongoose } = require("mongoose");


// creating note schema
const noteSchema=mongoose.Schema({
    title:String,
    body:String
},{versionKey:false})

const noteModel=mongoose.model("note",noteSchema)
module.exports={
    noteModel
}