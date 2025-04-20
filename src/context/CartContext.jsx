import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCartItems, addToCart, removeFromCart, updateCartItemQuantity } from '../services/api/cartService'; // Import the cart service functions

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the auth token in localStorage on component mount and when it changes
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, [localStorage.getItem('auth_token')]); // Re-run effect when the token in localStorage changes

  const fetchCart = async () => {
    if (isAuthenticated) { // Only fetch if authenticated
      setLoading(true);
      setError(null);
      try {
        const data = await getCartItems();
        setCartItems(data.results || []); // Adjust based on your API response structure
      } catch (err) {
        setError(err.message || 'Failed to fetch cart');
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems([]); // Clear cart if not authenticated
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]); // Refetch cart when authentication status changes

  const addItemToCart = async (productId, quantity = 1) => {
    try {
      const newItem = await addToCart(productId, quantity);
       setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => item.product.id === newItem.product.id);
        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        } else {
          return [...prevItems, newItem];
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to add item to cart');
      console.error('Error adding item to cart', err);
      // Consider showing a user-friendly message
    }
  };


  const changeQuantity = async (itemId, quantity) => {
    try {
      const updatedItem = await updateCartItemQuantity(itemId, quantity);
      setCartItems(currentItems =>
        currentItems.map(item => (item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item))
      );
    } catch (err) {
      setError(err.message || 'Failed to update quantity');
      console.error('Error updating quantity:', err);
      // Do not automatically refetch the whole cart here for auth errors
      // Consider showing an error to the user for this specific action
    }
  };

  const removeItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
    } catch (err) {
      setError(err.message || 'Failed to remove item');
      console.error('Error removing item:', err);
      // Do not automatically refetch the whole cart here for auth errors
      // Consider showing an error to the user for this specific action
    }
  };

  const value = {
    cartItems,
    loading,
    error,
    updateQuantity: changeQuantity,
    removeItem,
    addItemToCart,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, };