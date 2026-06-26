import React from 'react'
import Logo from '../components/Logo/Logo'
import { Outlet } from 'react-router'
import authimage from '../assets/authImage.png'
const AuthLayout = () => {
  return (
    <div class='max-w-7xl mx-auto min-h-screen pt-4'>
      <Logo></Logo>
      <div className='flex flex-col md:flex-row sm:gap-3 mt-5 md:mt-12 items-center'>
        <div className='flex-1'>
            <Outlet></Outlet>
        </div>
        <div className='flex-1'>
          <img className="w-full h-full object-cover" src={authimage} alt="Auth" />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

