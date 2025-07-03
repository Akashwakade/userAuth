const express=require("express")
const { userModel } = require("../model/user.model")
const jwt= require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()
// userRouter.get("/",(req,res)=>{
//     res.send("home page")
// })

// registration
userRouter.post("/register",async(req,res)=>{
    const{email,pass,location}=req.body
   try {
    bcrypt.hash(pass, 5, async(err, hash)=> {
    // Store hash in your password DB.
     const user=new userModel({email,pass:hash,location})
     await user.save()
     res.status(200).send({"msg":"new user has been added successfully!"})
    if(err){res.status(400).send(err)}
});
    
   } catch (error) {
     res.status(400).send({"msg":"new user has not been added !"})
    
   }
   
   
   
})

//login
//when token will generate? after login
userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body

   
   try {
    const user= await userModel.findOne({email})
    console.log(user)
 if(user) {
     bcrypt.compare(pass, user.pass, (err, result)=> {

    if(result){
        res.status(200).send(({"msg":"Login successfull!","token":jwt.sign({"course":"backend"},"masai")}))
    }else{
        res.status(400).send({"msg":"Wrong Credentials"},err)
    }
     
});
 }  
   } catch (err) {
    res.status(400).send({"msg":err.message})
   }
   
})


//get route
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
   const token=req.headers.authorization
    console.log(token)
    jwt.verify(token,'masai',(err,decoded)=>{
        decoded?res.status(200).send("user details"):res.status(400).send(err,"cannot access restricted routes, please login first")
    });

   
})
userRouter.get("/cart",(req,res)=>{
    
    const token=req.headers.authorization
    jwt.verify(token,"masai",(err,decoded)=>{
        decoded? res.send({"msg":"user login successfully to cart page"}):
         res.status(200).send({"msg":"invalid user", err})
    })
    
})

module.exports={userRouter}