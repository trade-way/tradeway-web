// src/config/endpoints.js

import VerifyOTP from "@/pages/VerifyOtp";

const API_ENDPOINTS = {
  authentication: {
    login: "auth/login",
    register: "auth/signup",
    verifyOTP: "auth/verify-otp",
    resendOTP: "auth/resend-otp",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
    logout: "auth/logout",
    refreshToken: "auth/refresh",
    me: "auth/me",
    googleLogin: 'v1/auth/social_login/google', 
  },
  product: {
    list: "products",
    details: "products/:id",
    create: "products",
    update: "products/:id",
    delete: "products/:id",
  },
  user: {
    profile: "users/profile",
    updateProfile: "users/profile",
    updateAvatar: "users/avatar",
  },
  order: {
    list: "orders",
    details: "orders/:id",
    create: "orders",
    cancel: "orders/:id/cancel",
  },
};

// List of public endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  API_ENDPOINTS.authentication.login,
  API_ENDPOINTS.authentication.register,
  API_ENDPOINTS.authentication.verifyOTP,
  API_ENDPOINTS.authentication.resendOTP,
  API_ENDPOINTS.authentication.forgotPassword,
  API_ENDPOINTS.authentication.resetPassword,
  API_ENDPOINTS.authentication.refreshToken,
  API_ENDPOINTS.product.list,
  API_ENDPOINTS.product.details,
];

export { API_ENDPOINTS, PUBLIC_ENDPOINTS };
