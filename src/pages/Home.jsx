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
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    product.categories.forEach(category => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
    });
    return acc;
  }, {});
  // Define the titles and the corresponding product lists to display
  const dealSections = [
    { title: 'Your Related Items...', products: products.sort(() => 0.5 - Math.random()).slice(0, 5) },
    { title: 'Televisons', products: productsByCategory['Tv'] || [] },
    { title: 'Laptops', products: productsByCategory['Laptop'] || [] },
   
    { title: 'HeadPhones', products: productsByCategory['HeadPhones'] || [] },
    { title: 'Accessories', products: productsByCategory['Accessories'] || [] },
    // Add more sections as needed
  ];

  const categoryKeys = Object.keys(productsByCategory);

  return (
    <div>
      <Hero />
      <Category categoryItem={categoryItem} />
      <TodayDeal Todayitems={deals} />
      {dealSections.slice(0,1).map((section) => (
        <Deals
          key={section.title}
          dealName={section.title}
          dealList={section.products}
          onViewAllClick={handleViewAllClick}
          displayStyle="imagePriceOnly"
        />
      ))}

<Brands brandImageList={brandList} />
{dealSections.slice(2,5).map((section) => (
        <Deals
          key={section.title}
          dealName={section.title}
          dealList={section.products}
          onViewAllClick={handleViewAllClick}
          displayStyle="imagePriceOnly"
        />
      ))}

    

     

     
      

     

      {/* Add more Deals components for other categories as needed */}
    </div>
  );
};

export default Home;