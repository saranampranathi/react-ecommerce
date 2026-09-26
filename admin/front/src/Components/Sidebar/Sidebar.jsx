import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addproducticon from '../../assets/addproduct.png';
import listprodcuticon from '../../assets/listproduct.png';
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={addproducticon} alt="" />
          <p>Add product </p>
        </div>
        </Link>



         <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={listprodcuticon} alt="" />
          <p>Product list </p>
        </div>
        </Link>
    </div>
  )
}

export default Sidebar