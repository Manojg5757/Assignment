import mongoose from "mongoose";


const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:Array,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{timestamps:true})

const employeeModel = mongoose.model('employee',employeeSchema)

export default employeeModel 