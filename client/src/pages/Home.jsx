import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowAltCircleRight } from "react-icons/fa";


const Home = () => {
  return (
    <div>
      <h1 className='text-xl sm:text-3xl font-bold text-center my-7'>Welcome To the Employee Panel</h1>
      <Link className='text-center text-blue-500 underline flex gap-2 items-center justify-center' to='/login'>
          Login<FaArrowAltCircleRight className='text-sm' />
      </Link>
    </div>
  )
}

export default Home