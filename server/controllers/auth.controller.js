import bcryptjs from 'bcryptjs'
import userModel from '../model/userModel.js'
import { errorHandler } from '../utils/error.js'
import jwt from "jsonwebtoken"

export const signup = async(req,res,next)=>{
    const{username,email,password} = req.body
    console.log(username)
    const hashedPassword = bcryptjs.hashSync(password,10)

    try {
        const newUser = new userModel({username,email,password:hashedPassword})
        await newUser.save()
        console.log(newUser)
        res.json("New User Created")

    } catch (error) {
        next(error)
    }
}

export const login = async(req,res,next)=>{
    const {email,password} = req.body
    try {
        const validUser = await userModel.findOne({email})
        if(!validUser){
            return next(errorHandler(404,"User Not found"))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        console.log(validPassword)
        if(!validPassword){
            return next(errorHandler("400","Invalid Credentials"))
        }

        

        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest} = validUser._doc

        res.cookie("access_token",token,{httpOnly:true}).json(rest)
    } catch (error) {
        next(error)
    }
}