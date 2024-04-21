import React from 'react';
import './BreadCrum.css';
import arrow_icon from '../Assets/arrow-icon.jpeg';
import { NavLink } from 'react-router-dom';

const BreadCrum = (props) => {
  const { product, categoryPath } = props;

  return (
    <div className='breadchrum-container'>
      <NavLink to='/' className='nav-home'><p>Home</p></NavLink>
      <img src={arrow_icon} alt="" className='bread-img'/>
      <NavLink to={categoryPath} className='nav-home'><p>{product.category}</p></NavLink>
      <img src={arrow_icon} alt="" className='bread-img'/><p>{product.name}</p>
    </div>
  );
}

export default BreadCrum;
