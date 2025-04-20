// src/services/authService.js
import { api, API_ENDPOINTS } from "./axios";

const authService = {
  login: async (credentials) => {
    const response = await api.post(
      API_ENDPOINTS.authentication.login,
      credentials
    );

    if (response.tokens && response.tokens.access_token) {
      localStorage.setItem("auth_token", response.tokens.access_token);
    }
    if (response.tokens && response.tokens.refresh_token) {
      localStorage.setItem("refresh_token", response.tokens.refresh_token);
    }

    return response;
  },

  // Add this Google login function
  googleLogin: async (googleData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.authentication.googleLogin,
        //
        {
          auth_token: googleData.access_token,
          // redirect_uri: googleData.redirectUri || window.location.origin, // Required
        }
      );
      console.log(response, "response from google login");
      // Store tokens if they exist in the response
      if (response.data && response.data.access_token) {
        localStorage.setItem("auth_token", response.data.access_token);
      }
      if (response.data && response.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }

      return response;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  },

  register: async (userData) => {
    const response = await api.post(
      API_ENDPOINTS.authentication.register,
      userData
    );
    return response;
  },

  logout: async () => {
    await api.post(API_ENDPOINTS.authentication.logout);

    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
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
