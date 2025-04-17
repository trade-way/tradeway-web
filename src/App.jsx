import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/privateRoute.jsx";
// import { GoogleOAuthProvider } from '@react-oauth/google'

// Auth Pages
import Login from "@/pages/Login.jsx";
import Signup from "@/pages/Signup.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";
import ResendVerification from "@/pages/ResendVerification.jsx";
import ResetPassword from "@/pages/ResetPassword.jsx";
import VerifyOtp from "@/pages/VerifyOtp.jsx"

// UI Components
import { Container } from "./components/ui/container.jsx";

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

import ResetPassword from "./pages/ResetPassword.jsx";
import Layout from "./Layout.jsx";
import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/Product.jsx";
import Home from "./pages/Home.jsx"



function App() {
  return (
    
      <BrowserRouter>
        <Routes>

          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp/>}  />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/resend-verification" element={<ResendVerification />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* Add your protected routes here */}
            {/* Example: 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} /> 
            */}
          </Route>

          {/* Redirect to login for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />

          {/* Optional: Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />


          {/* SignIn, SignUp and landing page routes will be here */}
          <Route path="/login" element={<Login/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/cart" exact element={<Cart />}></Route>

         

          {/* <Route path="/products/:product" element={<ProductPage/>} /> */}

         {/* Layout component will be rendered for all the routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Home page as index route */}
            {/* <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} /> */}
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/products/:product" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
            {/* Add other protected routes here */}
          </Route>
          {/* Public Routes */}
         
         
          </Route>

          {/* 404 Page Not Found */}
          <Route path="*" element={<div>Page not found: {window.location.pathname}</div>} />

        </Routes>
      </BrowserRouter>
    
  );
}




export default App;

