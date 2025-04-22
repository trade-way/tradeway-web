/* pages/ProductDetails.jsx */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Share2, Star, ChevronDown } from "lucide-react";
import Delivery from "../assets/game-icons_card-pickup.png";
import doorDelivery from "../assets/game-icons_card-pickup (1).png";
import returnPolicy from "../assets/game-icons_card-pickup (2).png";
import { FaStar } from "react-icons/fa";
import Footer from "@/components/Footer";
import { useProduct } from '../context/ProductContext';
import { productService } from '../services/api/productService';
import { useCart } from "@/context/CartContext";

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-xs sm:text-sm">
      <div className="flex text-amber-400">
        {Array.from({ length: filledStars }).map((_, index) => (
          <Star key={`filled-${index}`} size={14} className="md:w-4 md:h-4" />
        ))}
        {hasHalfStar && <Star key="half" size={14} className="md:w-4 md:h-4 fill-amber-400" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star key={`empty-${index}`} size={14} className="md:w-4 md:h-4 text-gray-300" />
        ))}
      </div>
      <span className="text-gray-500 ml-1">({parseFloat(rating).toFixed(1)})</span>
    </div>
  );
};

const Dropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="border rounded-lg p-3 bg-gray-50 shadow-sm w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-medium text-gray-800"
      >
        {selected}
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <ul className="mt-2 border rounded-lg bg-white shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const { selectedProduct, setSelectedProduct } = useProduct();
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("Lagos State");
  const [selectedCity, setSelectedCity] = useState("Ijeshatedo Surulere");
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productService.getProductById(productId);
        setProductDetails(response.data);
        setMainImage(response.data.image);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
        console.error("Error fetching product details:", err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (selectedProduct && selectedProduct.id === productId) {
      setProductDetails(selectedProduct);
      setMainImage(selectedProduct.image);
      setLoading(false);
    } else {
      fetchDetails();
    }
  }, [productId, selectedProduct, navigate]);

  if (loading) {
    return <Container className="py-12">Loading product details...</Container>;
  }

  if (error) {
    return <Container className="py-12">Error loading product details: {error}</Container>;
  }

  if (!productDetails) {
    return <Container className="py-12">Product not found.</Container>;
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const getPickupDates = () => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() + 4);
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + 5);
    return `${formatDate(startDate)} and ${formatDate(endDate)}`;
  };

  const getDoorDeliveryDates = () => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() + 6);
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + 8);
    return `${formatDate(startDate)} and ${formatDate(endDate)}`;
  };

  const getDeliveryFee = () => {
    switch (selectedState) {
      case "Lagos State":
        return "₦2000";
      case "Abuja":
        return "₦4000";
      case "Ogun State":
        return "3000";
      default:
        return "₦3500";
    }
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    if (state === "Lagos State") {
      setSelectedCity("Ijeshatedo Surulere");
    } else if (state === "Abuja") {
      setSelectedCity("Abuja");
    } else if (state === "Ogun State") {
      setSelectedCity("Abeokuta");
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleAddToCart = async () => {
    if (productDetails && productDetails.id) {
      const result = await addItemToCart(productDetails.id, quantity);
      if (result && result.ok) {
        console.log("Item added to cart successfully!");
        navigate('/cart');
      } else {
        console.error("Failed to add item to cart:", result ? result.statusText : "Unknown error");
      }
    }
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left: Product Image */}
          <div className="bg-gray-100 p-4 rounded-lg flex justify-center w-full lg:w-1/2">
            <img
              src={mainImage}
              alt={productDetails.name}
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
              {productDetails.name}
            </h2>
            <p className="text-orange-500 text-lg md:text-xl font-semibold">
              ₦{parseFloat(productDetails.current_price).toLocaleString()}
            </p>
            <p className="text-gray-600 my-2 md:my-3 text-sm md:text-base">
              {productDetails.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 my-2">
              <FaStar className="text-yellow-500 text-lg md:text-xl mr-2 md:mr-5" />
              <p className="text-gray-500 text-sm md:text-base">
                <span className="text-black font-bold">
                  {parseFloat(productDetails.average_rating).toFixed(1)}
                </span>
              </p>
            </div>

            {/* Quantity and Order */}
            <div className="flex items-center gap-2 md:gap-4 my-3 md:my-4">
              <button
                className="px-2 md:px-3 py-1 border rounded-md"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-base md:text-lg">{quantity}</span>
              <button
                className="px-2 md:px-3 py-1 border rounded-md"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base">
                Order Now
              </button>
              <button
                className="flex items-center border border-blue-600 text-blue-600 px-3 md:px-4 py-2 rounded-full text-sm md:text-base"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                Add to Cart
              </button>
              <button className="flex items-center text-blue-600 py-2 text-sm md:text-base">
                <Share2 className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Images */}
        {productDetails.extra_images && productDetails.extra_images.length > 0 && (
          <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6">
            {[productDetails.image, ...productDetails.extra_images].map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 md:w-24 md:h-24 rounded-md overflow-hidden cursor-pointer border ${
                  mainImage === img ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => handleThumbnailClick(img)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 mx-auto pt-3 my-5 md:my-7">
          {/* Left Section (Tabs & Content) */}
          <div className="w-full lg:flex-1">
            {/* Tabs Section */}
            <div className="flex gap-4 md:gap-6 text-base md:text-lg font-semibold border-b">
              <Button
                onClick={() => setActiveTab("description")}
                variant="ghost"
                className={`pb-2 ${
                  activeTab === "description"
                    ? "font-bold text-base md:text-xl underline decoration-blue-600 underline-offset-8 md:underline-offset-10"
                    : "text-gray-600 text-base md:text-xl"
                }`}
              >
                Description
              </Button>
              <Button
                onClick={() => setActiveTab("reviews")}
                variant="ghost"
                className={`pb-2 ${
                  activeTab === "reviews"
                    ? "font-bold text-base md:text-xl underline decoration-blue-600 underline-offset-4"
                    : "text-gray-600 text-base md:text-xl"
                }`}
              >
                Reviews
              </Button>
            </div>

            {/* Content Section */}
            <div className="mt-4 md:mt-6 ml-0 md:ml-3 w-full">
              {activeTab === "description" && (
                <div>
                  <h3 className="text-base md:text-lg font-bold text-blue-600">
                    Brief Overview
                  </h3>
                  <p className="text-gray-600 mb-3 md:mb-5 text-sm md:text-base">
                    {selectedProduct.description}
                  </p>
                  <StarRating rating={parseFloat(selectedProduct.average_rating || 0)} />

                  <h3 className="text-base md:text-lg font-bold mt-5 md:mt-7 mb-3 md:mb-5 text-blue-600">
                    Detailed Information
                  </h3>
                  <p className="mt-2 mb-3 md:mb-5 text-[#353945] text-sm md:text-base">
                    <strong>Color:</strong> <span className="font-normal">{selectedProduct.color}</span>
                  </p>
                  <p className="mt-2 mb-3 md:mb-5 text-[#353945] text-sm md:text-base">
                    <strong>Size:</strong> <span className="font-normal">{selectedProduct.size}</span>
                  </p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-base md:text-lg font-semibold">Customer Reviews</h3>
                  <p className="text-gray-600 text-sm md:text-base">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section (Delivery & Returns) */}
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
            <div className="bg-gray-100 py-4 md:py-6 rounded-lg px-4 md:px-6 lg:px-8">
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 lg:mb-10">
                Delivery & Returns
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">
                <strong>Please Note:</strong> Some sizes, colors or units (if
                you order several) of this product may be shipped from abroad.
                If applicable, customs fees will be calculated and shown at
                checkout, and delivery timelines may vary.
              </p>

              <div className="mt-4">
                <h4 className="text-gray-800 font-semibold mb-3 md:mb-5 text-sm md:text-base">
                  Choose your location
                </h4>
                <section className="bg-gray-100 space-y-3 md:space-y-5">
                  <Dropdown
                    className="mb-3 md:mb-5"
                    label="State"
                    options={["Lagos State", "Ogun State", "Abuja"]}
                    onSelect={handleStateSelect}
                  />
                  <Dropdown
                    label="City"
                    options={
                      selectedState === "Lagos State" 
                        ? ["Ijeshatedo Surulere", "Ikeja", "Yaba"] 
                        : (selectedState === "Ogun State" 
                          ? ["Abeokuta", "Sagamu", "Ijebu-Ode"] 
                          : ["Abuja", "Garki", "Wuse"])
                    }
                    onSelect={handleCitySelect}
                  />
                </section>

                <div className="mt-4 md:mt-6">
                  <div className="flex gap-x-2 md:gap-x-3 mb-2">
                    <img src={Delivery} alt="Delivery Icon" className="w-5 h-5 md:w-auto md:h-auto" />
                    <div className="flex-1">
                      <p className="text-sm md:text-base">Delivery and Returns</p>
                      <p className="text-[#6E7174] text-xs md:text-sm">
                        Delivery Fees{" "}
                        <span className="text-[#FF9900] font-bold">
                          {getDeliveryFee()}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm ml-7 md:ml-8">
                    Ready for pickup between {getPickupDates()} if you place
                    your order within the next 14mins
                  </p>
                </div>

                <div className="mt-4 md:mt-6">
                  <div className="flex gap-x-2 md:gap-x-3 mb-2">
                    <img src={doorDelivery} alt="Door Delivery Icon" className="w-5 h-5 md:w-auto md:h-auto" />
                    <div className="flex-1">
                      <p className="text-sm md:text-base">Door Delivery</p>
                      <p className="text-[#6E7174] text-xs md:text-sm">
                        Delivery Fees{" "}
                        <span className="text-[#FF9900] font-bold">
                          {getDeliveryFee()} + ₦1500
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm ml-7 md:ml-8">
                    Expected delivery between {getDoorDeliveryDates()}
                  </p>
                </div>

                <div className="mt-4 md:mt-6">
                  <div className="flex gap-x-2 md:gap-x-3 mb-2">
                    <img src={returnPolicy} alt="Return Policy Icon" className="w-5 h-5 md:w-auto md:h-auto" />
                    <div className="flex-1">
                      <p className="text-sm md:text-base">Return Policy</p>
                      <p className="text-[#6E7174] text-xs md:text-sm">
                        Free return within 7 days for ALL eligible items Details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;