import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./lib/privateRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Pass from "./pages/Pass.jsx";
import { Container } from "./components/ui/container.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {/* SignIn, SignUp and landing page routes will be here */}
          <Route path="/login" element={Login} />
          <Route path="/Signup" element={Signup} />
          <Route path="/forgot-password" element={ForgotPassword} />
          <Route path="/Pass" element={Pass} />
          <Route path="/reset-password" element={ResetPassword} />
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
  );
}
export default App;
