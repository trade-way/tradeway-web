// src/services/paymentService.js
import { api, API_ENDPOINTS } from './axios';

const paymentService = {
  initiatePayment: async (orderData) => {
    return api.post(API_ENDPOINTS.payment.checkout, orderData);
  },
};

export { paymentService };