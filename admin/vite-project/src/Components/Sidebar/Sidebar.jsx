import React from 'react'
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../Assets/plus.png'
import list_product_icon from '../../Assets/features.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration: "none"}}>
        <div className='sidebar-item'>
            <img src={add_product_icon} className='add-icon' alt="" />
            <p>Add Products</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration: "none"}}>
        <div className='sidebar-item'>
            <img src={list_product_icon} className='add-icon' alt="" />
            <p>List Products</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
