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
                setCartItems(getDefaultCart(data));

                if(localStorage.getItem('auth-token'))
                {
                    fetch('http://localhost:4000/getdata',{
                        method:'POST',
                        headers:{
                            Accept:'application/form-data',
                            'auth-token':`${localStorage.getItem('auth-token')}`,
                            'Content-Type':'application/json',
                        },
                        body:"",
                    }).then((response)=>response.json())
                    .then((data)=>setCartItems(data));
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
    
    
    
    const updateCartItemQuantity = (itemId, quantity) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + quantity }));
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, allProducts, cartItems, addToCart, removeFromCart, updateCartItemQuantity };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
