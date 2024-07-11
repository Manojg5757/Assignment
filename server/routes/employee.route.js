import express from 'express'
import { create,getList,edit,update,deleteEmployee } from '../controllers/employee.controller.js'


const employeeRouter = express.Router()

employeeRouter.post('/create',create)
employeeRouter.get('/get',getList)
employeeRouter.get('/edit/:id',edit)
employeeRouter.put('/update/:id',update)
employeeRouter.delete('/delete/:id',deleteEmployee)

export default employeeRouter