// src/services/api/cartService.js
import { api, API_ENDPOINTS } from './axios';

// Use the correct path: products.cart.create instead of product.carts
const CART_API_ENDPOINT = API_ENDPOINTS.cart.create; 
console.log('Using cart endpoint:', CART_API_ENDPOINT);

const addToCart = async (productId) => {
  try {
    const response = await api.post(CART_API_ENDPOINT, {
      product: productId,
      quantity: 1,
    });
    
    // Return a standardized response with the CartProduct data
    return {
      ok: response.status === 201 || response.status === 200,
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    
    // Return a standardized error response
    return {
      ok: false,
      status: error.response?.status || 500,
      statusText: error.response?.statusText || 'Unknown error',
      data: error.response?.data || null
    };
  }
};

export { addToCart };