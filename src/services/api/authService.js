// src/services/authService.js
import { api, API_ENDPOINTS } from "./axios";

const authService = {
  login: async (credentials) => {
    const response = await api.post(
      API_ENDPOINTS.authentication.login,
      credentials
    );

    if (response.tokens.access_token) {
      localStorage.setItem("auth_token", response.access_token);
    }
    if (response.tokens.refresh_token) {
      localStorage.setItem("refresh_token", response.refresh_token);
    }

    return response;
  },

  register: async (userData) => {
    return api.post(API_ENDPOINTS.authentication.register, userData);
  },

  logout: async () => {
    await api.post(API_ENDPOINTS.authentication.logout);

    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  },

  forgotPassword: async (email) => {
    return api.post(API_ENDPOINTS.authentication.forgotPassword, { email });
  },

  resetPassword: async (token, newPassword) => {
    return api.post(API_ENDPOINTS.authentication.resetPassword, {
      token,
      new_password: newPassword,
    });
  },
};

export default authService;
