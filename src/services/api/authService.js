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
    const response = await api.post(
      API_ENDPOINTS.authentication.register,
      userData
    );
    return response;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log("Refresh Token being sent:", refreshToken); // Add this line
    try {
      await api.post(API_ENDPOINTS.authentication.logout, { refresh_token: refreshToken });
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },

  // In your authService.js file
  verifyOTP: async (otpValue) => {
    try {
      const response = await api.post(API_ENDPOINTS.authentication.verifyOTP, {
        code: otpValue, // Transform the parameter name from "otp" to "code"
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add this to your authService.js
  resendOTP: async (email) => {
    try {
      const response = await api.post(API_ENDPOINTS.authentication.resendOTP, {
        email: email,
      });
      return response.message;
    } catch (error) {
      throw error;
    }
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
