import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from "react-router-dom";
import { Container } from './components/ui/container';

const layout = () => {
  return (
    <Container>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </Container>
  )
}

export default layout