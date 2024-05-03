import React, { useState, useEffect, useRef } from 'react';
import './Offers.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Offers = ({ allProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Function to handle selecting a product and navigate to its details
  const handleProductSelect = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <span><i className="fa-solid fa-magnifying-glass"></i></span>
        <input 
          placeholder="What are you looking for?" 
          className="search-input" 
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
        />
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

      {/* Conditionally render dropdown with filtered products */}
      {isDropdownOpen && (
        <div ref={dropdownRef} className='dropdown'>
          {filteredProducts.map((product, index) => (
            <div className='searched-products' key={index} onClick={() => handleProductSelect(product.id)}>
              <img src={product.image} alt={product.name} />
              <div className='searched-products-h3' >{product.name}</div>
              {/* You can add more product details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
