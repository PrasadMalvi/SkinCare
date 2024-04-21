import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
<footer>
    <div className="container">
        <div className="row">
            <div className="col-md-2 col-sm-4 col-6">
                <h3>Information</h3>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Delivery Information</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                </ul>
            </div>
            <div className="col-md-2 col-sm-4 col-6">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">Site Map</a></li>
                </ul>
            </div>
            <div className="col-md-2 col-sm-4 col-6">
                <h3>Extras</h3>
                <ul>
                    <li><a href="#">Brand</a></li>
                    <li><a href="#">Gift Vouchers</a></li>
                    <li><a href="#">Affiliates</a></li>
                    <li><a href="#">Specials</a></li>
                </ul>
            </div>
            
        </div>
        <div className="col-md-6 col-sm-12">
                <div className="footer-icons">
                    <p className="pull-left">Copyright &copy; 2035 by Glownius. Powered and secured by Prasad Malvi.</p>
                    <p className="pull-right">
                        <span>Follow us: &nbsp;</span>
                        <a href="https://www.facebook.com/prasad.malvi.50/"><i className="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/malviprasad/"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/malviprasad/"><i className="fab fa-instagram"></i></a>
                    </p>
                </div>
            </div>
    </div>
</footer>
  );
}

export default Footer;
