import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CheckoutPage = () => {
  const navigate = useNavigate(); 
    const [fullName, setFullName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const handlePlaceOrder = async () => {
        try {
            // Validate required fields
            if (!fullName || !addressLine1 || !city || !state || !postalCode || !country) {
                console.error("Please fill in all required fields");
                return;
            }

            // Send order data to backend
            const response = await fetch('http://localhost:4000/placeorder', {
                method: 'POST',
                headers: {
                  Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`, // Include user token for authentication
                },
                body: JSON.stringify({
                    fullName,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    postalCode,
                    country
                })
            });
            const data = await response.json();
            if (data.success) {
                // Order placed successfully
                console.log("Order placed successfully1");
                navigate('/');
            } else {
                // Error placing order
                console.error("Error placing order:", data.error);
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (
        <div>
            <h2>Checkout Page</h2>
            <label>Full Name:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} /><br />
            <label>Address Line 1:</label>
            <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} /><br />
            <label>Address Line 2:</label>
            <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} /><br />
            <label>City:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /><br />
            <label>State:</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} /><br />
            <label>Postal Code:</label>
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} /><br />
            <label>Country:</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} /><br />
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default CheckoutPage;
