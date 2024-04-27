import React, { useContext } from 'react';
import './CartItems.css'; 
import { Context } from '../../Context/Context';
import Pricedetails from './Pricedetails';
import empty_cart from '../Assets/empty-cart.webp';
import { NavLink } from 'react-router-dom';

const CartItems = () => {
  const { allProducts, cartItems, addToCart, removeFromCart } = useContext(Context);

  const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);

  return (
    <div className="cartitems">
      <div className="cartitems-left">
        {hasItemsInCart ? (
          <>
            {allProducts.map(product => {
              const quantity = cartItems[product.id];
              if (quantity > 0) {
                return (
                  <div key={product.id} className="cart-item">
                    <div>
                      <img src={product.image} alt={product.name} className="cart-item-image" />
                      <div className="cart-item-quantity">
                        <button onClick={() => removeFromCart(product.id)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => addToCart(product.id)}>+</button>
                      </div>
                    </div>
                    <div className="cart-item-details">
                      <p className="cart-item-name">{product.name}</p>
                      <p className="cart-item-prices">
                        <span style={{ textDecorationLine: 'line-through', color: '#888' }}>
                          <i className="fa fa-inr" />{product.old_price}
                        </span>
                        <span>
                          <i className="fa fa-inr" />{product.new_price}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            })}

            <NavLink to='/checkout'><button type="button" className="cart-buy-button">PROCEED TO CHECKOUT</button></NavLink>
          </>
        ) : (
          <div className="cart-empty">
            <img src={empty_cart} alt="" className="empty-cart-image" />
            <p>Your cart is currently empty.</p>
            <NavLink to="/">
              <button className="cart-explore">Explore the site to add to cart</button>
            </NavLink>
          </div>
        )}
      </div>
      <div className="cart-total-right">
        <Pricedetails allProducts={allProducts} cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartItems;
