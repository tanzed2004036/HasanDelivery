import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Shared/Navbar/Navbar'
import Footer from '../pages/Shared/Footer/Footer'

const RootLayout = () => {
  return (
    <div class='max-w-7xl mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default RootLayout
