import React from 'react'
import './Navbar.css';
import navProfile from '../../Assets/boy.png'
import navlogo from '../../Assets/dropdown.png'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
    <div className='nav-name'>
        <NavLink to='/' exact="true" style={{textDecoration: "none", color:"white"}}>
            Glownius
        </NavLink>
    </div>
      <img src={navProfile}  className='nav-profile' alt="" />
    <img src={navlogo} className='navlogo' alt="" />
    </div>
  )
}

export default Navbar
