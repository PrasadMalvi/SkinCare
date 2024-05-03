// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar';
import Offers from './Components/Navigation/Offers';
import Index from './Home/Index'
import Footer from './Components/Navigation/Footer'
import ShopAll from './Pages/ShopAll';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import CartPage from './Pages/CartPage';
import New from './Pages/New';
import banner_face from './Components/Assets/face.webp';
import banner_bestseller from './Components/Assets/bestseller.webp'
import banner_eye from './Components/Assets/eye.webp'
import banner_lips from './Components/Assets/lips.webp'
import banner_shopall from './Components/Assets/shopall.webp'
import banner_new from './Components/Assets/new.webp';
import LoginSignup from './Pages/LoginSignup';
import CheckoutPage from './Pages/CheckoutPage';
import ProfilePage from './Pages/ProfilePage';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <Router>
      <Offers allProducts={allProducts}/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shopall" element={<ShopAll banner={banner_shopall}/>} />
        <Route path="/new" element={<New banner={banner_new}/>} />
        <Route path="/lips" element={<ShopCategory banner={banner_lips} category="lips"/>} />
        <Route path="/eye" element={<ShopCategory banner={banner_eye} category="eye"/>} />
        <Route path="/face" element={<ShopCategory banner={banner_face} category="face"/>} />
        <Route path="/bestseller" element={<ShopCategory banner={banner_bestseller} category="bestseller"/>} />
        <Route path="/product/:productId" element={<Product />} />
        {/* <Route path='' element={<Product />} /> */}
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
