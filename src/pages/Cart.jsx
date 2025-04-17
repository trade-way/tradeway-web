import CartProduct from '@/components/CartProduct'
import ViewedCarousel from '@/components/RecentlyViewedCarousel'
import TopSellingItemsCarousel from '@/components/TopSellingItemsCarousel'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import YouMayALsoLikeCarousel from '@/components/YouMayAlsoLikeCarousel'
import { Container } from '@/components/ui/container'

const Cart = () => {
  return (<>
    {/* <Container> */}
        <CartProduct />
    <ViewedCarousel />
    <TopSellingItemsCarousel />
    <YouMayALsoLikeCarousel />
    {<Footer />}
    {/* </Container> */}
    </>
  )
}

export default Cart