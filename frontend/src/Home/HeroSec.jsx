import React from 'react';
import './HeroSec.css';
import { NavLink } from 'react-router-dom';


function HeroSec() {
  return (
    <div className='hero-section'>
      <div className='hero-para'>
        <p>NEW RELEASE<br/>
          <span className='hero-text'>Metallics<br />
          <span className='hero-text1'>Shine</span> on </span>
          <br />Get to know our new eyeshadow <br />palettes with a glossy finish, smooth <br />lightweight feel and 10 hour stay-on
        </p><br /><br />
        <NavLink to='/new'><button type='submit' className='herobutton1'><b>Shop</b></button></NavLink>
      </div>
      <div className="hero-img"></div>
    </div>
  );
}

export default HeroSec;
