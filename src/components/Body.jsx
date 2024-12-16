import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div className=''>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Body