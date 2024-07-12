import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { logoutStart, logoutSuccess } from '../redux/user/userSlice';
const AdminPanel = () => {
  const[employeeList,setEmployeeList] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const dispatch = useDispatch()

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
      setEmployeeList(prevList => prevList.filter((item)=> item._id !== id))
     } catch (error) {
      console.log(error)
     }
  }

  const extractDate = (timestamp) => {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); //      1 because getMonth() returns zero-based index
    const day = String(dateObject.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};

useEffect(() => {
  const results = employeeList.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.gender.toLowerCase().includes(searchTerm.toLowerCase()) 
    
  );
  setFilteredEmployees(results);
}, [searchTerm, employeeList]);

const handleLogout = async()=>{
  try {
    dispatch(logoutStart())
    const res = await axios.get('/server/auth/logout')
    console.log(res.data)
    dispatch(logoutSuccess())
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
      <div className='flex justify-between  mt-7'>
        <div className='flex items-center bg-white w-fit p-2 rounded-lg'>
        <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search...' 
        className='outline-none'/>
         <IoSearchOutline />
        </div>
      <p className='underline cursor-pointer' onClick={handleLogout}>Logout</p>
      </div>
          <table className='table-auto border-2  border-black overflow-x-auto'>
            <thead>
            <tr className='border-2 border-black'>
              <th className='border-2 border-black px-4 py-2'>ID</th>
              <th className='border-2 border-black px-4 py-2'>Profile</th>
              <th className='border-2 border-black px-4 py-2'>Name</th>
              <th className='border-2 border-black px-4 py-2'>Email</th>
              <th className='border-2 border-black px-4 py-2'>Mobile No</th>
              <th className='border-2 border-black px-4 py-2'>Designation</th>
              <th className='border-2 border-black px-4 py-2'>Gender</th>
              <th className='border-2 border-black px-4 py-2'>Course</th>
              <th className='border-2 border-black px-4 py-2'>Created Date</th>
              <th className='border-2 border-black px-4 py-2'>Action</th>
            </tr>
            </thead>
            {
              filteredEmployees && filteredEmployees.length > 0 &&(
                filteredEmployees.map((employee,index)=>{
                  return(
                    <tbody key={employee._id}>
                    <tr className='border-2 border-black'>
                    <td className='border-2 text-center border-black'>{index+1}</td>
                    <td className='border-2 border-black'>
                      <img className='w-[50px] mx-auto h-[50px] rounded-full' src={employee.image} alt="profile" />
                    </td>
                    <td className='border-2 text-center border-black'>{employee.name}</td>
                    <td className='border-2 text-center border-black'>{employee.email}</td>
                    <td className='border-2 text-center border-black'>{employee.mobile}</td>
                    <td className='border-2 text-center border-black'>{employee.designation}</td>
                    <td className='border-2 text-center border-black'>{employee.gender}</td>
                    <td className='border-2 text-center border-black'>{employee.course}</td>
                    <td className='border-2 text-center border-black'>{extractDate(employee.createdAt)}</td>
                    <td className='flex gap-2 '>
                      <Link to={`/edit/${employee._id}`}>
                      <button className='bg-green-400 w-20 rounded-lg px-3 py-1'>Edit</button>
                      </Link>
                      <button onClick={()=>handleDelete(employee._id)} className='bg-red-600 rounded-lg px-3 py-1'>Delete</button>
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