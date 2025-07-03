const express=require("express")
const { noteModel } = require("../model/note.model")
const { authMiddleware } = require("../middleware/authMiddleware")

const noteRouter=express.Router()


//get all note
noteRouter.get("/",async(req,res)=>{
    try {
        
    const note=await noteModel.find()
    res.status(200).send({"msg":"note home route",data:note})
    } catch (error) {
    res.status(400).send({"msg":error.message})
        
    }
   
})
//get single note by id
noteRouter.get("/:id",async(req,res)=>{
    try {
        const note= await noteModel.findOne({_id:req.params.id})
    res.status(200).send({"msg":"note found!" , "data": note})
    } catch (error) {
        res.status(400).send({"msg":"problem getting a note"})
    }
    
})

//addnote
noteRouter.post("/addNote",async(req,res)=>{
    try {
        const note= new noteModel(req.body)
   await note.save()
//    console.log(note)
   res.status(200).send({"msg":"a new note has been added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
   
})

//update

noteRouter.patch("/update/:id",async(req,res)=>{
    const data=req.body
    const id=req.params.id
    console.log(id,data)
    //we are taking _id here because id is store in mongodb with key _id and we are comparing it is value in line no. 38
    try {
        const note=await noteModel.findByIdAndUpdate({_id:id},req.body);
        if(!note) return res.status(404).send({msg:"Note not found"});
        res.status(200).send({msg:"Note updated", data: note})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
    
})
//delete
noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try {
        const note=await noteModel.findByIdAndDelete({_id:id});
        res.status(200).send({"data":note, "msg":"note has been deleted"})
    } catch (error) {
        res.status(400).send({"msg":"error deleting note"})
    }
    
})

module.exports={
    noteRouter
}