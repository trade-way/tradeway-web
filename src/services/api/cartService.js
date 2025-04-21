// src/services/api/cartService.js
import { api, API_ENDPOINTS } from './axios';

/**
 * Get the user's cart items
 * @returns {Promise} - Cart data response
 */
const getCartItems = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.cart.list);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

/**
 * Add an item to the cart
 * @param {string} productId - Product ID to add
 * @param {number} quantity - Quantity to add (defaults to 1)
 * @returns {Promise} - Cart item creation response
 */
const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post(API_ENDPOINTS.cart.create, {
      product: productId,
      quantity
    });
    
    // Check if the response is what you expect
    return {
      ok: true,
      data: response,  // Modified: The axios interceptor already returns response.data
      status: 200,
      statusText: 'Success'
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      ok: false,
      status: error.response?.status || 500,
      statusText: error.response?.statusText || 'Unknown error',
      data: error.response?.data || null
    };
  }
};
/**
 * Remove an item from the cart
 * @param {string} cartItemId - Cart item ID to remove
 * @returns {Promise} - Response from removal
 */
const removeFromCart = async (cartItemId) => {
  try {
    const endpoint = API_ENDPOINTS.cart.delete.replace(':id', cartItemId);
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

/**
 * Update cart item quantity
 * @param {string} cartItemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise} - Updated cart item
 */
// src/services/api/cartService.js
const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const endpoint = `${API_ENDPOINTS.cart.list}${cartItemId}/`; // Construct the correct URL
    const response = await api.patch(endpoint, {
      quantity
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

export {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity
};