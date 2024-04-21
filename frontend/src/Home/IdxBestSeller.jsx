import React, { useEffect, useState } from 'react';
import './IdxBestSeller.css';
import Item from '../Components/Item/Item';
import { Link, useNavigate } from 'react-router-dom';

const IdxBestSeller = (props) => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        // Filter bestseller products
        const bestSellerItems = data.filter((item) => item.category === 'bestseller');
        setBestSellerProducts(bestSellerItems);
        // Display only 8 products
        setDisplayedProducts(bestSellerItems.slice(0, 8));
      });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const navigateTo = (path) => {
    scrollToTop();
    navigate(path);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='best-seller'>
      <p>Must Have</p>
      <p className='best_selle-para'><b>Best</b><i> Seller</i></p>
      <hr />
      <div className="best_seller-section">
        {displayedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
        {/* Conditional rendering to display all bestseller products */}
        <Link to='/bestseller' onClick={() => navigateTo('/bestseller')}><button className='idxbtn'>Shop Best Sellers</button></Link>
      </div>
    </div>
  );
};

export default IdxBestSeller;
