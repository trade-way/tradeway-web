import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation } from "react-router-dom";
<<<<<<< Updated upstream
import { Container } from './components/ui/container';
=======

>>>>>>> Stashed changes

const Layout = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/signup", "/forgot-password", "/pass", "/reset-password"].includes(location.pathname);
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
  return (
    <Container>
      {!hideLayout && <Navbar />}
      <Outlet />
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      {!hideLayout && <Footer />}
    </Container>
  );
}

export default Layout;
