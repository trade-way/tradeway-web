import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/signup", "/forgot-password", "/pass", "/reset-password"].includes(location.pathname);

  

  return (
    <>
      {!hideLayout && <Navbar />}
      <Outlet />

      {!hideLayout && <Footer />}
    </>
  );
}

export default Layout;
