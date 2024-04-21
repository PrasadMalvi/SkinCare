import React, { useContext } from 'react';
import './CartItems.css'; // Import your CSS file for styling
import { Context } from '../../Context/Context';
import Pricedetails from './Pricedetails';
import empty_cart from '../Assets/empty-cart.webp';
import { NavLink } from 'react-router-dom';

const CartItems = () => {
  const { allProducts, cartItems, updateCartItemQuantity } = useContext(Context);

  // ... your existing code for images and cartItemsImageList (if applicable)

  const hasItemsInCart = Object.values(cartItems).some((quantity) => quantity > 0);

  return (
    <div className="cartitems">
      <div className="cartitems-left">
        {hasItemsInCart ? (
          <>
            {allProducts.map((product) => {
              const quantity = cartItems[product.id];
              if (quantity > 0) {
                return (
                  <div key={product.id} className="cart-item">
                    <div>
                      <img src={product.image} alt={product.name} className="cart-item-image" />
                      <div className="cart-item-quantity">
                        <button onClick={() => updateCartItemQuantity(product.id, -1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => updateCartItemQuantity(product.id, 1)}>+</button>
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
              return null; // Filter out empty products
            })}

            <button type="button" className="cart-buy-button">PROCEED TO CHECKOUT</button>
          </>
        ) : (
          <div className="cart-empty">
            <img src={empty_cart} alt="" className="empty-cart-image"></img>
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
