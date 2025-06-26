const express=require("express")
const { userModel } = require("../model/user.model")

const userRouter=express.Router()
userRouter.get("/",(req,res)=>{
    res.send("home page")
})

userRouter.post("/addUser",async(req,res)=>{
    try {
        const payload=req.body
         const user=new userModel(payload)
      await user.save()
      res.status(200).send({msg:"new user has been added to db"})
    } catch (error) {
        res.status(400).send({msg:"problem in user adding"})
    }
   
})

module.exports={userRouter}