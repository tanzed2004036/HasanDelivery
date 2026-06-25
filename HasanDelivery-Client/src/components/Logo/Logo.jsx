import React from 'react'
import logo from '../../assets/logo.png'

const Logo = () => {
  return (
    <div className='flex items-center'>
      <img src={logo} alt="HasVery logo" className='w-7 h-7 sm:w-8 sm:h-8 object-contain' />
      <h1 className='text-lg sm:text-2xl font-bold -ml-1'>asVery</h1>
    </div>
  )
}

export default Logo