import React from 'react';
import './IdxShopLips.css';
import { NavLink } from 'react-router-dom';

function IdxShopLips() {

  return (
    <div className='lips-section'>
      <div className='lips-para'>
      <p>NEW RELEASE<br/>
          <span className='hero-text'>Metallics<br />
          <span className='hero-text1'>Shine</span> on </span>
          <br />Get to know our new eyeshadow <br />palettes with a glossy finish, smooth <br />lightweight feel and 10 hour stay-on
        </p><br /><br />
        <NavLink to='/lips'><button type='submit' className='button2'><b>Shop Lips</b></button></NavLink>
      </div>
      <div className="lips-topi">
        <img src={require('../Components/Assets/image.png')} className='lips-img' alt='lips' />
      </div>
    </div>
  );
}

export default IdxShopLips;
