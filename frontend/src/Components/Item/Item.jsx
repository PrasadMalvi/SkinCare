import React from 'react'
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // Smooth scrolling behavior
    });
  };

  return (
    <div className="item-container">
          <div className='box'>
          <Link to={`/product/${props.id}`} className='nav-box' onClick={scrollToTop}>
            <img src={props.image} className='box-img' alt={props.name} /></Link>
            <p className='box-det'>{props.name}</p>
            <div className='prices'>
            <p className='box-det box-detline'>₹{props.old_price}</p>        
            <p className='box-det'>₹{props.new_price}</p>        
            </div>
          </div>
      </div>
  )
}

export default Item
