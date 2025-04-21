// src/services/api/orderService.js

import { api, API_ENDPOINTS } from "./axios"; // Assuming your axios instance is in './axios'

export const orderService = {
  async getOrders() {
    try {
      const response = await api.get(API_ENDPOINTS.product.ordersList);
      return response.data; // Axios automatically parses JSON
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  async getOrderDetails(orderId) {
    try {
      const response = await api.get(
        API_ENDPOINTS.order.details.replace(":id", orderId) // Assuming individual order details are under /v1/orders/:id
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching order details for ID ${orderId}:`, error);
      throw error;
    }
  },

  async createOrder(orderData) {
    try {
      const response = await api.post(API_ENDPOINTS.order.create, orderData); // Assuming order creation is under /v1/orders
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  async cancelOrder(orderId) {
    try {
      const response = await api.post(
        API_ENDPOINTS.order.cancel.replace(":id", orderId) // Assuming order cancellation is under /v1/orders/:id/cancel
      );
      return response.data;
    } catch (error) {
      console.error(`Error cancelling order with ID ${orderId}:`, error);
      throw error;
    }
  },

  // Add other order-related API calls as needed
};