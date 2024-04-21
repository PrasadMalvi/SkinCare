// SideDrawer.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.css';
import { Context } from '../../Context/Context';

const SideDrawer = ({ getTotalCartItems }) => {
  return (
    <div className="sidedrawer">
      <ul className='nav-list'>
        <li><NavLink to='/shopall' exact="true">SHOP ALL</NavLink></li>
        <li><NavLink to='/new' exact="true">NEW</NavLink></li>
        <li><NavLink to='/bestseller' exact="true">BEST SELLER</NavLink></li>
        <li><NavLink to='/face' exact="true">FACE</NavLink></li>
        <li><NavLink to='/lips' exact="true">LIPS</NavLink></li>
        <li><NavLink to='/eye' exact="true">EYE</NavLink></li>
      </ul>
      <div className='login'>
        <NavLink to='/login' exact="true"><div className='user-login'><img src={require('../Assets/user.png')} className='user-img' alt='login' /><h3>Login</h3></div></NavLink>
        <NavLink to='/cartpage' exact="true"><img src={require('../Assets/bag.png')} className='nav-cart' alt='login' />
          <div className='cart-count'>{getTotalCartItems()}</div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideDrawer;
