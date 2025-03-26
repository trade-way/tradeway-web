import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation } from "react-router-dom";
import { Container } from './components/ui/container';

const Layout = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/signup", "/forgot-password", "/pass", "/reset-password"].includes(location.pathname);

  return (
    <Container>
      {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </Container>
  );
}

export default Layout;
