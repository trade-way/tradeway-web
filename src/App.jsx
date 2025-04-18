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
import VerifyOtp from "@/pages/VerifyOtp.jsx";

// UI Components
import { Container } from "./components/ui/container.jsx";

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

import Layout from "./Layout.jsx";

// import AddressForm from "./pages/AddressForm.jsx";


import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/Product.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/productDetails.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";



function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

         
         {/* Layout component will be rendered for all the routes */}
          <Route path="/" element={<Layout />}/>
          {/* <Route path="/" element={<AddressForm />}/> */}

       
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* Add protected routes inside here */}
              {/* <Route path="/address" element={<AddressForm />} /> */}
          </Route>
          {/* Public Routes */}
          {/* e.g. <Route  index  element={<Home/>} />  for the homepage/landingpage*/}
         
          <Route path="/resend-verification" element={<ResendVerification />} />


          {/* Protected Routes within Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Home page as index route */}
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/product/:product" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
            <Route path="/product-details/:productId" element={<Product />} />
            {/* Add other protected routes here */}
          </Route>



          {/* Redirect for the root path */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 Page Not Found */}
          <Route
            path="*"
            element={<div>Page not found: {window.location.pathname}</div>}
          />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;