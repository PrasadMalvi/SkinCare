import React from 'react';
import './Offers.css';

const Offers = () => {
  return (
    <div className='offer-sec'>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="nav-search">
        <span><i className="fa-solid fa-magnifying-glass"></i></span><input placeholder="What are you looking for?" className="search-input" />
      </div>

      <p>15% sitewide! Use promo code LOVE15</p>
  
      <div className="social-icons">
        <a href="https://www.facebook.com/prasad.malvi.50/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/malviprasad/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default Offers;
