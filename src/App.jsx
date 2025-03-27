import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/privateRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Pass from "./pages/Pass.jsx";
import { Container } from "./components/ui/container.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Product from "./pages/productDetails.jsx";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {/* Redirect / to /login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pass" element={<Pass />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/product-details" element={<Product />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* Add protected routes inside here */}
          </Route>

          {/* 404 Page Not Found */}
          <Route path="*" element={<div>Page not found: {window.location.pathname}</div>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
