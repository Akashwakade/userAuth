const express=require("express")
const { userModel } = require("../model/user.model")
const jwt= require("jsonwebtoken")

const userRouter=express.Router()
// userRouter.get("/",(req,res)=>{
//     res.send("home page")
// })

// registration
userRouter.post("/register",async(req,res)=>{
    try {
        const payload=req.body
         const user=new userModel(req.body)
      await user.save()
      res.status(200).send({msg:"new user has been added to db"})
    } catch (error) {
        res.status(400).send({msg:"problem in user adding"})
    }
   
})

//login
//when token will generate? after login
userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body
   const user= await userModel.find({email,pass})
   user.length>0?res.status(200).send(`${user} login successfull, token: ${jwt.sign({course:"backend"},"masai")}`):
   res.status(400).send("login error")
   
})
userRouter.get("/",async(req,res)=>{
 try {
    const querry=req.query
    const user=  await userModel.find(querry)
    res.send(user)
  
 } catch (error) {
    res.send(error)
 }
})
//patch not working now because of json content
userRouter.patch("/update/:userId",async(req,res)=>{
const {userId}=req.params
const data=req.body
try {
    await  userModel.findByIdAndUpdate({_id:userId},data)
    res.status(200).send({msg:"user has been updated successfully"})
} catch (error) {
    res.status(400).send({msg:"something went wrong with user update"})
}
})
//delete
userRouter.delete("/delete/:userId",async(req,res)=>{
    const {userId}=req.params
    try {
    await userModel.findByIdAndDelete({_id:userId})
        res.status(200).send({msg:"user has been deleted successfully"})
    } catch (error) {
        res.status(400).send({msg:"something went wrong for user delete"})
    }
})

//protected /authenticated routes
userRouter.get("/data",(req,res)=>{
    // const token=(req.query.token)
    //we will take token from headers.authorization
    //to decode the token jwt.verify
    const {token}=req.query
    console.log(token)
    jwt.verify(token,'masai',(err,decoded)=>{
        decoded?res.status(200).send("user details"):res.status(400).send(err,"cannot access restricted routes, please login first")
    });

   
})
userRouter.get("/cart",(req,res)=>{
    
    const token=(req.query.token)
    jwt.verify(token,"masai",(err,decoded)=>{
        decoded? res.send({"msg":"user login successfully to cart page"}):
         res.status(200).send({"msg":"invalid user", err})
    })
    
})

module.exports={userRouter}