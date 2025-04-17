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
// import AddressForm from "./pages/AddressForm.jsx";



function App() {
  return (
    
      <BrowserRouter>
        <Routes>

          {/* SignIn, SignUp and landing page routes will be here */}
          <Route path="/login" element={<Login/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Pass" element={<Pass />} />
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
         

          {/* 404 Page Not Found */}
          <Route path="*" element={<div>Page not found: {window.location.pathname}</div>} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
