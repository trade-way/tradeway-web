import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/privateRoute.jsx";

// Auth Pages
import Login from "@/pages/Login.jsx";
import Signup from "@/pages/Signup.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";
import ResendVerification from "@/pages/ResendVerification.jsx";
import ResetPassword from "@/pages/ResetPassword.jsx";

// UI Components
import { Container } from "./components/ui/container.jsx";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;