import express from 'express'
import { create } from '../controllers/employee.controller.js'


const employeeRouter = express.Router()

employeeRouter.post('/create',create)

export default employeeRouter