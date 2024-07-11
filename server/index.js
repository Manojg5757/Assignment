import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from "./routes/auth.route.js";
import employeeRouter from "./routes/employee.route.js";

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI).
then(()=>{
    console.log("Connected to Mongodb")
}).catch(err=>console.log(err))

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.json({name:"Manoj"})
})

app.use('/server/auth',authRouter)
app.use('/server/employee',employeeRouter)

const port = 3000

app.listen(port,()=>{
    console.log("Connected to server 3000")
})


app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })
})