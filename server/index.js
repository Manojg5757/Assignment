import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.json({name:"Manoj"})
})

const port = 3000

app.listen(port,()=>{
    console.log("Connected to server 3000")
})