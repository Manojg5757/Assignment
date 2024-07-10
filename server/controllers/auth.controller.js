import bcryptjs from 'bcryptjs'
import userModel from '../model/userModel.js'

export const signup = async(req,res)=>{
    const{username,email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)

    try {
        const newUser = new userModel({username,email,password:hashedPassword})
        await newUser.save()
        console.log(newUser)
        res.json(newUser)

    } catch (error) {
        console.log(error)
    }
}