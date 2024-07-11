import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import e from 'cors'
const AdminPanel = () => {
  const[employeeList,setEmployeeList] = useState([])
  useEffect(()=>{
      const fetchData = async()=>{
          try {
            const res = await axios.get('/server/employee/get')
            setEmployeeList(res.data)
          } catch (error) {
            console.log(error)
          }
      }
      fetchData()
  },[])

  const handleDelete = async(id)=>{
     try {
      await axios.delete('/server/employee/delete/'+id)
     } catch (error) {
      console.log(error)
     }
  }

  console.log(employeeList)
  return (
    <div className='max-w-6xl mx-auto p-3'>
      <div className='flex justify-between'>
        <p className='text-xl'>Employee Details</p>
        <Link to='/create-employee'>
        <button className='p-2 px-4 bg-green-400 rounded-lg'>Create</button>
        </Link>
      </div>
      
          <table className='table-auto border-2  border-black'>
            <thead>
            <tr className='border-2 border-black'>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Profile</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Mobile No</th>
              <th className='px-4 py-2'>Designation</th>
              <th className='px-4 py-2'>Gender</th>
              <th className='px-4 py-2'>Course</th>
              <th className='px-4 py-2'>Created Date</th>
              <th className='px-4 py-2'>Action</th>
            </tr>
            </thead>
            {
              employeeList && employeeList.length > 0 &&(
                employeeList.map((employee)=>{
                  return(
                    <tbody key={employee._id}>
                    <tr className='border-2 border-black'>
                    <td>{employee._id}</td>
                    <td>
                      <img className='w-[50px] h-[50px] rounded-full' src={employee.image} alt="profile" />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.course}</td>
                    <td>{employee.createdAt}</td>
                    <td className='flex gap-2'>
                      <Link to={`/edit/${employee._id}`}>
                      <button className='bg-green-400 w-20 rounded-lg px-4 py-2'>Edit</button>
                      </Link>
                      <button onClick={()=>handleDelete(employee._id)} className='bg-red-600 rounded-lg px-4 py-2'>Delete</button>
                    </td>
                  </tr>
                  </tbody>
                  )
                })
              )
            }
          </table>
        
      
    </div>
  )
}

export default AdminPanel