import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'


const Navbar = () => {
  const{currentUser} = useSelector(state=>state.user)
  console.log(currentUser)
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='max-w-6xl mx-auto p-3 flex items-center justify-between flex-wrap'>
            <Link to='/'>
              <h1 className='text-sm sm:text-xl'>
                 <span className='text-slate-500'>Employee</span>
                 <span className='text-slate-700'>Portal</span>
              </h1>
            </Link>
            <ul className='flex gap-4'>
                <li>
                    <Link to='/signup'>SignUp</Link>
                </li>
                <li>
                    <Link to='login'>Login</Link>
                </li>
                <li>
                  {currentUser ? currentUser.username : ""}
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Navbar