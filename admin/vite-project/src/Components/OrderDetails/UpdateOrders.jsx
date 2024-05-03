import React, { useState, useEffect } from 'react';
import './UpdateOrders.css';

const UpdateOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:4000/adminorderdetails', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Handle error gracefully, such as displaying a message to the user
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            // Update the status of the order
            await fetch(`http://localhost:4000/updateorderstatus`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId, status: newStatus }), // Pass orderId and newStatus in the request body
            });

            // Fetch updated orders after status update
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
            // Handle error gracefully, such as displaying an alert to the user
            alert('Error updating order status');
        }
    };

    return (
        <div className='update-orders-container'>
            <h1>Update Orders</h1>
            <ul className='order-list'>
            {orders.map(order => (
                <li key={order.orderId} className='order-item'>
                    <div>       
                        {order.orderedProducts ? (
                            order.orderedProducts.map(product => (
                                <div key={product.productId} className='admin-product'>
                                    {/* Render product details */}
                                    <div>
                                    <img src={product.image} alt={product.name} className='admin-product-imgs' />
                                    </div>
                                    <div>
                                    <p className='admin-product-names'>Name: {product.name}</p>
                                    <p className='admin-product-id'>Product ID: {product.productId}</p>
                                    <p className='admin-product-qty'>Quantity: {product.quantity}</p>
                                    
                                    <p className='admin-product-prices'>Total Price: {product.new_price * product.quantity}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}


                        {/* Render order ID and status */}
                        <div className='product-status-update'>
                        <p>Order ID: {order.orderId} <br /><br /> Status: {order.status}</p>
                        {/* Update status */}
                        <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                            className='status-select'
                        >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        </div>
                        
                    </div>
                </li>
            ))}

            </ul>
        </div>
    );
};

export default UpdateOrders;
