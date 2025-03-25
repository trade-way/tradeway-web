import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './lib/privateRoute.jsx'
import { Container } from "@/components/ui/container"


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
          <Route
            path="*"
            element={<div>Page not found: {window.location.pathname}</div>}
          />
          <Route element={<PrivateRoute />}>
            {/* The layout route */}
            {/* The routing that will be protected will be here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>


  )
}
export default App;