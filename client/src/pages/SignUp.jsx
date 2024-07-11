import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const SignUp = () => { 
  const navigate = useNavigate()
  const[formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    const{id,value} = e.target
    setFormData({
      ...formData,
      [id]:value
    })
  }

  const handleSubmit = async(e)=>{
   e.preventDefault()
   try {
    const res = await axios.post('/server/auth/signup',formData)
    navigate('/login')
    console.log(res.data)
   } catch (error) {
    console.log(error)
   }
  }

  console.log(formData)
  return (
    <div className=''>
      <h1 className='text-center'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-xl mx-auto p-3'>
        <input type="text" placeholder='Username...' id='username' value={formData.username} onChange={handleChange} className='p-3 outline-none rounded-lg' />
        <input type="email" placeholder='Email...' id='email' value={formData.email} onChange={handleChange} className='p-3 outline-none rounded-lg' />
        <input type="password" placeholder='password...' id='password' value={formData.password} onChange={handleChange} className='p-3 outline-none rounded-lg' />
        <button type='submit' className='bg-slate-700 p-3 rounded-lg text-white'>SignUp</button>
      </form>
    </div>
  )
}

export default SignUp