
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { product } = useParams();
  const navigate = useNavigate();

  // Product category configurations
  const productConfig = {
    laptops: {
      title: "Laptops",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl cursus tellus eget fringilla eget.",
      image: "../images/categoryImage/laptop.png",
      brandLogo: "../images/categoryImage/laptop.png",
      brandName: "Hp Laptops"
    },
    tv: {
      title: "TVs",
      description: "Experience stunning visuals and immersive entertainment with our range of televisions.",
      image: "../images/categoryImage/tv.png",
      brandLogo: "../images/categoryImage/tv.png",
      brandName: "Smart TVs"
    }
    // Add more product categories as needed
  };

  // Check if product category exists
  const currentProduct = productConfig[product?.toLowerCase()];

  // If product category doesn't exist, show Not Found page
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Product Category Not Found</h2>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the product category you're looking for.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const products = Array(12).fill({
    name: "Lorem ipsum dolor sit amet",
    price: "₦103,000",
    rating: 5,
    reviews: 120,
    image: currentProduct.image
  });

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Fixed Banner Section */}
      <div className="fixed top-0 left-0 right-0 z-10 w-full h-[280px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-contain bg-right bg-no-repeat"
          style={{
            backgroundImage: `url("${currentProduct.image}")`,
            filter: 'brightness(1)'
          }}
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,55,197,0.95), rgba(0,55,197,0.85) 50%, transparent 100%)'
          }}
        />
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-16">
          <h1 className="text-6xl font-bold text-white mb-4">{currentProduct.title}</h1>
          <p className="text-gray-200 max-w-md text-lg leading-relaxed">
            {currentProduct.description}
          </p>
        </div>
      </div>

      {/* Scrollable Product Listing */}
      <div className="relative pt-[245px]">
        <div className="max-w-7xl mx-auto py-12 px-16">
          <div className="flex items-center gap-2 mb-8">
            <img src={currentProduct.brandLogo} alt={`${currentProduct.brandName} Logo`} className="w-8 h-8" />
            <h2 className="text-xl font-semibold">{currentProduct.brandName}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-48 mb-4">
                  <img 
                    src={product.image} 
                    alt={`${currentProduct.title} Product`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-sm">{product.name}</h3>
                    <p className="text-[#FFA500] font-semibold">{product.price}</p>
                    <div className="flex items-center text-sm">
                      <div className="flex text-black">★★★★★</div>
                      <span className="ml-1 text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  <button className="mt-2 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 