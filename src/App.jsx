import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/privateRoute.jsx";
<<<<<<< Updated upstream
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Pass from "./pages/Pass.jsx";
import { Container } from "./components/ui/container.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Layout from "./Layout.jsx";
import ProductPage from "./pages/Product.jsx";
import Home from "./pages/Home.jsx"
=======

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
>>>>>>> Stashed changes

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
<<<<<<< Updated upstream

          {/* SignIn, SignUp and landing page routes will be here */}
          <Route path="/login" element={<Login/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Pass" element={<Pass />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/products/:product" element={<ProductPage/>} /> */}
         {/* Layout component will be rendered for all the routes */}
          <Route path="/" element={<Layout />}>
          {/* Protected Routes */}
          <Route  index  element={<Home/>} />  
          <Route element={<PrivateRoute />}>
            {/* Add protected routes inside here */}
          </Route>
          {/* Public Routes */}
         
         
         
=======
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
>>>>>>> Stashed changes
          </Route>

          {/* Redirect for the root path */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 Page Not Found */}
          <Route path="*" element={<div>Page not found: {window.location.pathname}</div>} />
        </Routes>
      </BrowserRouter>
    
  );
}

<<<<<<< Updated upstream
export default App;
=======
export default App;
>>>>>>> Stashed changes
