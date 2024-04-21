import React from 'react';

const Pricedetails = ({ allProducts, cartItems }) => {
  // Handle potential missing data gracefully
  if (!allProducts || !cartItems || allProducts.length === 0) {
    return <div>Loading price details...</div>; // Or display a more informative message
  }

  // Calculate price details dynamically
 

  const totalSavings = Object.values(cartItems).reduce((total, quantity, index) => {
    const product = allProducts.find(item => item.id === index + 1); // Assuming product IDs start from 1
    if (!product || !product.old_price || !product.new_price) {
      console.warn(`Product at index ${index} is missing or has incomplete pricing information`);
      return total; // Skip this item in the calculation
    }
    return total + (quantity * (product.old_price - product.new_price));
  }, 0);

  const totalPrice = Object.values(cartItems).reduce((total, quantity, index) => {
    const product = allProducts.find(item => item.id === index + 1); // Assuming product IDs start from 1
    if (!product || !product.new_price) {
      console.warn(`Product at index ${index} is missing or has no new_price`);
      return total; // Skip this item in the calculation
    }
    return total + (quantity * product.new_price);
  }, 0);
  return (
    <div className="cart-total-right">
      <div style={{ marginBottom: 20 }}>
        <h1>Price Details</h1>
      </div>

      <h3>Price ({Object.keys(cartItems).length} items): ₹ {totalPrice}</h3>
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
