import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/privateRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Pass from "./pages/Pass.jsx";
import { Container } from "./components/ui/container.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Layout from "./Layout.jsx";
<<<<<<< Updated upstream
=======
import ProductPage from "./pages/Product.jsx";
import Home from "./pages/Home.jsx"
>>>>>>> Stashed changes

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>

          {/* SignIn, SignUp and landing page routes will be here */}
          <Route path="/login" element={<Login/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Pass" element={<Pass />} />
          <Route path="/reset-password" element={<ResetPassword />} />
         
         {/* Layout component will be rendered for all the routes */}
          <Route path="/" element={<Layout />}>
          {/* Protected Routes */}
          <Route  index  element={<Home/>} />  
          <Route element={<PrivateRoute />}>
            {/* Add protected routes inside here */}
          </Route>
          {/* Public Routes */}
         
         
         
          </Route>

          {/* 404 Page Not Found */}
          <Route path="*" element={<div>Page not found: {window.location.pathname}</div>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
