import React, { useContext, useState } from 'react';
import './CheckoutPage.css';
import { Context } from '../Context/Context';

const CheckoutPage = () => {
  const { checkoutHandle } = useContext(Context);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    paymentMethod: 'cash',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Validate the form data
    if (
      formData.fullName.trim() === '' ||
      formData.addressLine1.trim() === '' ||
      formData.city.trim() === '' ||
      formData.state.trim() === '' ||
      formData.postalCode.trim() === '' ||
      formData.country.trim() === ''
    ) {
      alert('Please fill out all required fields.');
      return;
    }
  
    try {
      // Call the checkoutHandle function from the context
      const response = await checkoutHandle(formData);
      
      // Check if the order placement was successful
      if (response && response.success) {
        alert('Order placed successfully!');
        // Optionally, redirect the user to a confirmation page or do other actions
      } else {
        alert('Failed to place order. Please try again later.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };
  
  

  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label htmlFor="fullName">Full Name:</label>
        <input
          className='check-lab'
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="addressLine1">Address Line 1:</label>
        <input
          className='check-lab'
          type="text"
          id="addressLine1"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />

        <label htmlFor="addressLine2">Address Line 2:</label>
        <input
          className='check-lab'
          type="text"
          id="addressLine2"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
        />

        <label htmlFor="city">City:</label>
        <input
          className='check-lab'
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">State:</label>
        <input
          className='check-lab'
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <label htmlFor="postalCode">Postal Code:</label>
        <input
          className='check-lab'
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />

        <label htmlFor="country">Country:</label>
        <input
          className='check-lab'
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="cash">Cash on Delivery</option>
          {/* Add other payment methods if applicable */}
        </select>

        <button type="submit" className="place-order-button">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
