import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Context } from '../../Context/Context';

const Navbar = () => {
  const { getTotalCartItems } = useContext(Context);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate(); // Get the navigate function

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

  // Function to toggle the visibility of the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Use the navigate function to go to the specified path after scrolling to top
  const navigateTo = (path) => {
    scrollToTop();
    navigate(path);
    setIsOpen(false); // Close the sidebar after navigating
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth-token'); // Remove the authentication token from local storage
    window.location.replace("/"); // Redirect to the homepage
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <img src={require('../Assets/dropdown.png')} className='dropdownmenu' onClick={toggleSidebar}></img>
      <div className='nav-name'>
        <NavLink to='/' onClick={() => navigateTo('/')}>
          Glownius
        </NavLink>
      </div>
      <ul className={`nav-list ${isOpen ? 'open' : ''}`}> {/* Add 'open' class when sidebar is open */}
        <li>
          <NavLink
            to='/shopall'
            onClick={() => {
              navigateTo('/shopall'); // Navigate to the desired page
              setIsOpen(false); // Close the sidebar
            }}
          >
            SHOP ALL
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/new'
            onClick={() => {
              navigateTo('/new');
              setIsOpen(false);
            }}
          >
            NEW
          </NavLink>
          </li>
        <li>
          <NavLink to='/bestseller' onClick={() => {navigateTo('/bestseller');setIsOpen(false);}}>
            BEST SELLER
          </NavLink>
        </li>
        <li>
          <NavLink to='/face' onClick={() => {navigateTo('/face');setIsOpen(false);}}>
            FACE
          </NavLink>
        </li>
        <li>
          <NavLink to='/lips' onClick={() => {navigateTo('/lips');setIsOpen(false);}}>
            LIPS
          </NavLink>
        </li>
        <li>
          <NavLink to='/eye' onClick={() => {navigateTo('/eye');setIsOpen(false);}}>
            EYE
          </NavLink>
        </li>
      </ul>
      <div className='login'>
        {localStorage.getItem('auth-token') ? (
          <div className="logged-in">
            <h3 onClick={logout}>Logout</h3>
            <NavLink to='/profilepage' onClick={() => navigateTo('/profilepage')}><img src={require('../Assets/user.png')} className='user-img' alt='login' /></NavLink>
            <NavLink to='/cartpage' onClick={() => navigateTo('/cartpage')}>
              <img src={require('../Assets/bag.png')} className='nav-cart' alt='login' />
              <div className='nav-cart nav-cartcount'>{getTotalCartItems()}</div>
            </NavLink>
          </div>
        ) : (
          <NavLink to='/login' onClick={() => navigateTo('/login')}>
            <div className='user-login'>
              <h3>Login</h3>
              <NavLink to='/cartpage' onClick={() => navigateTo('/cartpage')}>
                <img src={require('../Assets/bag.png')} className='nav-cart' alt='login' />
                <div className='nav-cart nav-cartcount'>{getTotalCartItems()}</div>
              </NavLink>
            </div>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
