import React from 'react';

const Pricedetails = ({ allProducts, cartItems }) => {
  if (!allProducts || !cartItems || allProducts.length === 0) {
    return <div>Loading price details...</div>;
  }

  const totalSavings = Object.keys(cartItems).reduce((total, productId) => {
    const quantity = cartItems[productId];
    const product = allProducts.find(item => item.id === parseInt(productId));
    if (!product || !product.old_price || !product.new_price) {
      console.warn(`Product with ID ${productId} is missing or has incomplete pricing information`);
      return total;
    }
    return total + (quantity * (product.old_price - product.new_price));
  }, 0);

  const totalPrice = Object.keys(cartItems).reduce((total, productId) => {
    const quantity = cartItems[productId];
    const product = allProducts.find(item => item.id === parseInt(productId));
    if (!product || !product.new_price) {
      console.warn(`Product with ID ${productId} is missing or has no new_price`);
      return total;
    }
    return total + (quantity * product.old_price);
  }, 0);

  const itemCount = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

  return (
    <div className="cart-total-right">
      <div style={{ marginBottom: 20 }}>
        <h1>Price Details</h1>
      </div>

      <h3>Price ({itemCount} item's): ₹ {totalPrice}</h3>
      <hr />
      {totalSavings > 0 && (
        <h3>Discount: ₹ {totalSavings}</h3>
      )}
      <hr />
      <h3>Buy more & save more: - ₹ {totalSavings}</h3>
      <hr />
      <h3>Delivery Charges: Free</h3>
      <hr />
      <h3>You will save ₹ {totalSavings} on this order</h3>
      <div>
        <hr />
        <h2>Total Amount: ₹ {totalPrice - totalSavings}</h2>
      </div>
    </div>
  );
};

export default Pricedetails;
