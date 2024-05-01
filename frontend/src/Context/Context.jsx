import React, { createContext, useEffect, useState } from 'react';

export const Context = createContext(null);

const ContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => {
                setAllProducts(data);
                const defaultCart = getDefaultCart(data);
                // Merge default cart with fetched cart data
                setCartItems(prevCart => {
                    const mergedCart = { ...prevCart };
                    for (const itemId in defaultCart) {
                        if (!(itemId in mergedCart)) {
                            mergedCart[itemId] = defaultCart[itemId];
                        }
                    }
                    return mergedCart;
                });
    
                if (localStorage.getItem('auth-token')) {
                    fetch('http://localhost:4000/getdata', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: "",
                    }).then((response) => response.json())
                        .then((data) => {
                            // Merge fetched cart data with default cart
                            const mergedCart = { ...defaultCart, ...data };
                            setCartItems(mergedCart);
                        });
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);
    

    const addToCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                    
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=> response.json())
            .then((data)=> console.log(data))
            .catch((error)=> console.error("Error:", error));
        }
    }

    const getDefaultCart = (allProducts) => {
        let cart = {};
        allProducts.forEach(product => {
            cart[product.id] = 0; 
        });
        return cart;
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then(data => console.log(data))
                .catch(error => console.error("Error:", error));
        }
    }
    
    /* const checkoutHandle = async (formData, itemId) => {
        try {
          // Ensure that the formData object is properly structured
          // and contains all required fields before sending it to the server
          // Send form data to backend endpoint for processing
          const response = await fetch('http://localhost:4000/placeorder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('auth-token') // Include the authentication token in the request headers
            },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
          if (response.ok) {
            // Handle successful response from backend
            console.log('Order placed successfully:', data);
            alert('Order placed successfully!');
            
            // Redirect to the home page after a short delay (e.g., 1 second)
            setTimeout(() => {
                window.location.href = '/'; // Replace '/home' with the actual URL of your home page
            }, 1000);
          } else {
            // Handle error response from backend
            console.error('Failed to place order:', data.error);
            alert('Failed to place order. Please try again.');
          }
        } catch (error) {
          // Handle network errors
          console.error('Error placing order:', error);
          alert('Failed to place order. Please try again later.');
        }
      }; */
      

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, allProducts, cartItems, addToCart, removeFromCart };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
