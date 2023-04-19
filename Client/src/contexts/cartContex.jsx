import React, { createContext, useState } from 'react';

export const CartContext = createContext();
// this is the cartContext which is used to store the cartItems and functions to add and remove items from cart
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
        console.log("cartItems is called")
        console.log(cartItems)
    };

    const removeFromCart = (itemId) => {
        // this is the function to remove item from cart by filtering the cartItems state and removing the item with itemId
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    return ( // this is the provider which is used to provide the cartItems and functions to add and remove items from cart to all the components
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
