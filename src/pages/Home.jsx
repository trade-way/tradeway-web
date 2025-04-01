import React from 'react';
import Hero from '../components/Hero';
import Deals from '../components/Deals';
import Brands from '../components/Brands'
import Category from '../components/Category'
import TodayDeal from '../components/TodayDeal';
import { Container } from '../components/ui/container';

const Home = () => {

    const categoryItem = [
        { name: 'Laptop', image: "./images/categoryImage/laptop.png" },
        { name: 'Camera', image: "./images/categoryImage/camera.png" },
        { name: 'Accessories', image: "./images/categoryImage/stand.png" },
        { name: 'Tv', image: "./images/categoryImage/tv.png" },
        { name: 'HeadPhones', image: "./images/categoryImage/Headphone.png" },
        { name: 'Storage', image: "./images/categoryImage/Sd.png" },
        { name: 'Home Theater', image: "./images/categoryImage/Ht.png" },
      ]
    
      const deals = [
        { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
        { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
        { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
        { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
      ]
      const dealSampleData = [
        { productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: 30, productImage: "./images/categoryImage/tv.png", rating: 100 },
        { productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: 30, productImage: "./images/categoryImage/tv.png", rating: 100 },
        { productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: 30, productImage: "./images/categoryImage/tv.png", rating: 100 },
        { productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: 30, productImage: "./images/categoryImage/tv.png", rating: 100 },
      ]
      const brandList=[
        {brandImage1: "./images/DealImage/image1.png",brandImage2: "./images/DealImage/image1.png",brandImage3: "./images/DealImage/image1.png",brandImage4: "./images/DealImage/image1.png",},
        {brandImage1: "./images/DealImage/image1.png",brandImage2: "./images/DealImage/image1.png",brandImage3: "./images/DealImage/image1.png",brandImage4: "./images/DealImage/image1.png",},
        {brandImage1: "./images/DealImage/image1.png",brandImage2: "./images/DealImage/image1.png",brandImage3: "./images/DealImage/image1.png",brandImage4: "./images/DealImage/image1.png",},
        {brandImage1: "./images/DealImage/image1.png",brandImage2: "./images/DealImage/image1.png",brandImage3: "./images/DealImage/image1.png",brandImage4: "./images/DealImage/image1.png",},
      ]

  return (
    <div>
      <Hero />
      <Category categoryItem={categoryItem} />
      <TodayDeal Todayitems={deals} />
      <Deals dealName='Your Related Items...' dealList={dealSampleData}/>
      <Deals dealName='Appliances'dealList={dealSampleData}/>
      <Brands brandImageList={brandList}/>
      <Deals dealName='Headphones'dealList={dealSampleData}/>
      <Deals dealName='Acessories'dealList={dealSampleData}/>
      <Deals dealName='Acessories'dealList={dealSampleData}/>
    </div>
  )
}

export default Home