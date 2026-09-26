import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/navlog.png'
import navprofile from '../../assets/navpprofille.jpg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='navlogo'/>
        <img src={navprofile} alt='' className='navprofile'/>

    </div>
  )
}

export default Navbar