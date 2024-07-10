import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='max-w-6xl mx-auto p-3 flex items-center justify-between flex-wrap'>
            <Link>
              <h1 className='text-sm sm:text-xl'>
                 <span className='text-slate-500'>Employee</span>
                 <span className='text-slate-700'>Portal</span>
              </h1>
            </Link>
            <form className='bg-white w-fit p-2 rounded-md hidden outline-none sm:block'>
                <input type="text" placeholder='search...' className='outline-none ' />
                <button type='submit'>
                    <IoSearchOutline />
                </button>
            </form>
            <ul className='flex gap-4'>
                <li>
                    <Link to='/signup'>SignUp</Link>
                </li>
                <li>
                    <Link to='login'>Login</Link>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Navbar