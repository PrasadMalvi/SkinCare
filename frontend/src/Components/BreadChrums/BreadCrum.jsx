import React from 'react';
import './BreadCrum.css';
import { NavLink } from 'react-router-dom';

const BreadCrum = (props) => {
  const { product, categoryPath } = props;

  return (
    <div className='breadchrum-container'>
      <NavLink to='/' className='nav-home'><p>Home > </p></NavLink>
      
      <NavLink to={categoryPath} className='nav-home'><p>{product.category} > </p></NavLink>
      <p>{product.name}</p>
    </div>
  );
}

export default BreadCrum;
