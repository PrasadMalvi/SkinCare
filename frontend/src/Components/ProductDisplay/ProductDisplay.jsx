import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star-icon.png';
import star_dull_icon from '../Assets/star-dull-icon.png';
import { Context } from '../../Context/Context';
import {useNavigate} from 'react-router-dom'

const ProductDisplay = (props) => {
    const navigate = useNavigate();
    const { product } = props;
    const { addToCart } = useContext(Context);

    // Function to handle "Buy Now" button click
    const handleBuyNow = () => {
        // Here you can perform actions such as adding the product to the cart and then redirecting to the checkout page
        addToCart(product.id);
        // Redirect to the checkout page or any other desired page
        // For example:
        navigate('/checkout');
    };

    return (
        <div className='productdisplay-container'>
            <div className="productdisplay-img">
                <img className="productdisplay-main-img" src={product.image} alt="" />
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" className='star-img'/>
                    <img src={star_icon} alt="" className='star-img'/>
                    <img src={star_icon} alt="" className='star-img'/>
                    <img src={star_icon} alt="" className='star-img'/>
                    <img src={star_dull_icon} alt="" className='productdisplay-right-star-dull star-img' />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                    <div className="productdisplay-right-price-new">₹{product.new_price}</div>
                </div>
                <div className="cart-buttons">
                    <button onClick={() => addToCart(product.id)} className='cart-button'>Add To Cart</button>
                    <button onClick={handleBuyNow} className='buy-button'>Buy Now</button>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                    {product.description}
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
