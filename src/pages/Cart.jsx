import CartProductList from '../components/CartProduct';
import ViewedCarousel from '@/components/RecentlyViewedCarousel';
import TopSellingItemsCarousel from '@/components/TopSellingItemsCarousel';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import YouMayALsoLikeCarousel from '@/components/YouMayAlsoLikeCarousel';
import { Container } from '@/components/ui/container';
import { useCart } from '../context/CartContext'; // Import the hook

const Cart = () => {
  const { cartItems, loading, error } = useCart();

  if (loading) {
    return <Container>Loading your cart...</Container>;
  }

  if (error) {
    return <Container>Error loading cart: {error}</Container>;
  }

  return (
    <>
      {/* <Container> */}
      <CartProductList cartItems={cartItems} />
      <ViewedCarousel />
      <TopSellingItemsCarousel />
      <YouMayALsoLikeCarousel />
      {<Footer />}
      {/* </Container> */}
    </>
  );
};

export default Cart;