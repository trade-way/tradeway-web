import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCartItems, addToCart, removeFromCart } from '../services/api/cartService'; // Import the cart service functions

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [total, setTotal] = useState(0); // State for the total

  useEffect(() => {
    // Check for the auth token in localStorage on component mount and when it changes
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, [localStorage.getItem('auth_token')]); // Re-run effect when the token in localStorage changes

  const fetchCart = async () => {
    if (isAuthenticated) {
      setLoading(true);
      setError(null);
      try {
        const data = await getCartItems();
        const cartWithDefaultQuantity = (data.results || []).map(item => ({
          ...item,
          quantity: item.quantity === undefined ? 1 : item.quantity,
        }));
        setCartItems(cartWithDefaultQuantity);
      } catch (err) {
        setError(err.message || 'Failed to fetch cart');
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems([]);
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]); // Refetch cart when authentication status changes

  // Calculate total whenever cartItems change
  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + (parseFloat(item.product?.current_price || 0) * item.quantity);
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = async (productId, quantity = 1) => {
    try {
      const result = await addToCart(productId, quantity);

      if (result.ok) {
        // Reload the cart to ensure we have the latest data
        await fetchCart();
      } else {
        setError(result.statusText || 'Failed to add item to cart');
      }
      return result;
    } catch (err) {
      setError(err.message || 'Failed to add item to cart');
      console.error('Error adding item to cart', err);
      return {
        ok: false,
        status: 500,
        statusText: err.message || 'Unknown error',
        data: null
      };
    }
  };

  const changeQuantity = (itemId, quantity) => {
    // Directly update the local state
    setCartItems(currentItems =>
      currentItems.map(item => (item.id === itemId ? { ...item, quantity: quantity } : item))
    );
    // The useEffect above will recalculate the total
  };

  const removeItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
      // Re-fetch the cart to ensure data consistency with the server
      await fetchCart();
    } catch (err) {
      setError(err.message || 'Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const value = {
    cartItems,
    loading,
    error,
    total, // Include total in the context value
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

export { CartContext };