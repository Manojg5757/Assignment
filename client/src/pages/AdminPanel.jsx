import React from 'react'
import {Link} from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div className='max-w-6xl mx-auto p-3'>
      <div className='flex justify-between'>
        <p className='text-xl'>Employee Details</p>
        <Link to='/create-employee'>
        <button className='p-2 px-4 bg-green-400 rounded-lg'>Create</button>
        </Link>
      </div>
      <form >
        
      </form>
    </div>
  )
}

export default AdminPanel