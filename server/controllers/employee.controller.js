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