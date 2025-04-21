import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Deals from '../components/Deals';
import Brands from '../components/Brands';
import Category from '../components/Category';
import TodayDeal from '../components/TodayDeal';
import { Container } from '../components/ui/container';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api/productService'; // Import productService

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryItem = [
    { name: 'Laptop', image: "./images/categoryImage/laptop.png" },
    { name: 'Camera', image: "./images/categoryImage/camera.png" },
    { name: 'Accessories', image: "./images/categoryImage/stand.png" },
    { name: 'Tv', image: "./images/categoryImage/tv.png" },
    { name: 'HeadPhones', image: "./images/categoryImage/Headphone.png" },
    { name: 'Storage', image: "./images/categoryImage/Sd.png" },
    { name: 'Home Theater', image: "./images/categoryImage/Ht.png" },
  ];

  const deals = [
    { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
    { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
    { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
    { productname: "camera", currentPrice: 30, oldPrice: 45, productImage: "./images/DealImage/image1.png", view1: "./images/DealImage/image2.png", view2: "./images/DealImage/image3.png", view3: "./images/DealImage/image4.png" },
  ];

  const brandList = [
    { brandImage1: "./images/DealImage/image1.png", brandImage2: "./images/DealImage/image1.png", brandImage3: "./images/DealImage/image1.png", brandImage4: "./images/DealImage/image1.png" },
    { brandImage1: "./images/DealImage/image1.png", brandImage2: "./images/DealImage/image1.png", brandImage3: "./images/DealImage/image1.png", brandImage4: "./images/DealImage/image1.png" },
    { brandImage1: "./images/DealImage/image1.png", brandImage2: "./images/DealImage/image1.png", brandImage3: "./images/DealImage/image1.png", brandImage4: "./images/DealImage/image1.png" },
    { brandImage1: "./images/DealImage/image1.png", brandImage2: "./images/DealImage/image1.png", brandImage3: "./images/DealImage/image1.png", brandImage4: "./images/DealImage/image1.png" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productService.getProductList();
        console.log("API Response:", response);
        console.log("API Response Results:", response.results);
        setProducts(response.results);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAllClick = () => {
    navigate('/product');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Hero />
      <Category categoryItem={categoryItem} />
      {/* <TodayDeal Todayitems={deals} /> */}
      <Deals
        dealName="Your Related Items..."
        dealList={products.sort(() => 0.5 - Math.random()).slice(0, 5)}
        onViewAllClick={handleViewAllClick}
        displayStyle="nameDescriptionOnly" // Changed displayStyle
        scrollDirection="horizontal" // Added scrollDirection
      />
      <Deals
        dealName="All Products"
        dealList={products}
        onViewAllClick={handleViewAllClick}
        displayStyle="nameDescriptionOnly" // Changed displayStyle
        scrollDirection="vertical" // Added scrollDirection
      />
      
    </div>
  );
};

export default Home;