// src/services/api/cartService.js
import { api, API_ENDPOINTS } from './axios';


const CART_API_ENDPOINT = API_ENDPOINTS.product.create; // Access it via API_ENDPOINTS.product.create

const addToCart = async (productId) => {
  try {
    const response = await api.post(CART_API_ENDPOINT, {
      product: productId,
      quantity: 1,
    });
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export { addToCart };