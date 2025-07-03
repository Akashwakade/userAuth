const express=require("express")
require('dotenv').config()

const { connection } = require("./db")
const { userRouter } = require("./route/userRoute")
const { noteRouter } = require("./route/noteRoute")
const { authMiddleware } = require("./middleware/authMiddleware")
const app=express()
app.use(express.json())

app.use("/user",userRouter)
app.use(authMiddleware)
app.use("/note",noteRouter)


app.listen(process.env.port,async()=>{
    try {
         await connection
       console.log("connected to mongodb")
    } catch (error) {
        console.log({msg:error.message})
    }
  
})