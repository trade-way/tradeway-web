import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/privateRoute.jsx";

// Auth Pages
import Login from "@/pages/Login.jsx";
import Signup from "@/pages/Signup.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";
import ResendVerification from "@/pages/ResendVerification.jsx";
import ResetPassword from "@/pages/ResetPassword.jsx";
import VerifyOtp from "@/pages/VerifyOtp.jsx";

// UI Components
// import { Container } from "./components/ui/container.jsx"; // You weren't using this

// Layout
import Layout from "./Layout.jsx";

// Public Pages
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/Product.jsx"; // You had this commented out

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/resend-verification" element={<ResendVerification />} />

          {/* Protected Routes within Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Home page as index route */}
            {/* <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} /> */}
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/products/:product" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
            {/* Add other protected routes here */}
          </Route>

          {/* Redirect for the root path */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 Page Not Found */}
          <Route path="*" element={<div>Page not found: {window.location.pathname}</div>} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
