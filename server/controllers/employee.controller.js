import employeeModel from "../model/employee/employee.js"
import { errorHandler } from "../utils/error.js"


export const create = async(req,res,next)=>{
    const{email,mobile} = req.body 
    try {
        const validEmail = await employeeModel.findOne({email})
        if(validEmail){
            return next(errorHandler(404,"Already Exists"))
        }
        const validMobile = await employeeModel.findOne({mobile})
        if(validMobile){
            return next(errorHandler(404,"Already Exists"))
        }
        const newEmployee = await employeeModel.create(req.body)
        console.log(newEmployee)
        res.status(200).json(newEmployee)
    } catch (error) {
        next(error)
    }
}

export const getList = async(req,res,next)=>{
    try {
        const employeeList = await employeeModel.find({})
        res.status(200).json(employeeList)
    } catch (error) {
        next(error)
    }
}

export const edit = async(req,res,next)=>{
    const{id} = req.params
    try {
        const user = await employeeModel.findById(id)
        console.log(user)
        res.json(user)
    } catch (error) {
        next(error)
    }
}
export const update = async(req,res,next)=>{
    const{id} = req.params
    console.log(id)
    try {
        const employee =await employeeModel.findByIdAndUpdate(id,req.body,{new:true})
        console.log(employee)
        res.status(200).json(employee)
    } catch (error) {
        next(error)
    }
}
 
export const deleteEmployee = async(req,res,next)=>{
    const{id} = req.params
    try {
        await employeeModel.findByIdAndDelete(id)
        res.json("Deleted")
    } catch (error) {
        nex(error)
    }
}