import { React, useState } from "react";
import Laptop from "../assets/laptop.png";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ShoppingCart } from "lucide-react";
import { Share2 } from "lucide-react";
import { Star } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Delivery from "../assets/game-icons_card-pickup.png";
import doorDelivery from "../assets/game-icons_card-pickup (1).png";
import returnPolicy from "../assets/game-icons_card-pickup (2).png";
import ProductOne from "../assets/61NI293PMXL.png";
import ProductTwo from "../assets/71L2wXXLthL.png";
import ProductThree from "../assets/71vZypjNkPS 1.png";
import ProductFour from "../assets/81I1sw-FBgL.png";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Footer from "@/components/Footer";

const productImages = [ProductOne, ProductTwo, ProductThree, ProductFour];

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => onRatingChange(star)}
        />
      ))}
      <p className="text-gray-500 ml-2">({rating}/5)</p>
    </div>
  );
};

const Dropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="border rounded-lg p-3 bg-gray-50 shadow-sm w-full max-w-md">
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
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Product = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  const features = [
    {
      title: "Unmatched Noise Cancellation",
      description:
        "Advanced active noise cancellation (ANC) blocks out unwanted background noise.",
    },
    {
      title: "High-Fidelity Audio",
      description:
        "Crisp highs, balanced mids, and deep bass for a rich sound experience.",
    },
    {
      title: "Comfortable Fit",
      description: "Soft ear cushions and lightweight build for extended wear.",
    },
    {
      title: "Long Battery Life",
      description: "Up to 24 hours of playtime on a single charge.",
    },
    {
      title: "Fast Charging",
      description: "15-minute charge provides 3 hours of playback.",
    },
    {
      title: "Bluetooth 5.1",
      description: "Stable wireless connectivity with low latency.",
    },
    {
      title: "Aware Mode",
      description:
        " Instantly switch to transparency mode to hear your surroundings.",
    },
    {
      title: "Crystal-Clear Calls",
      description: "Advanced mic system for better voice clarity in calls.",
    },
  ];

  return (
    <Container>
      <Navbar />
      <div className="max-w-6x mx-auto p-8">
        {/* Top Section */}
        <div className="flex flex-col justify-around  lg:flex-row gap-10">
          {/* Left: Product Image */}
          <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
            <img
              src={Laptop}
              alt="Product"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Right: Product Details */}
          <div className="w-1/2 ">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Lorem ipsum dolor sit
            </h2>
            <p className="text-orange-500 text-xl font-semibold">₦103,000</p>
            <p className="text-gray-600 my-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl
              cursus tellus eget fringilla eget. Diam eu est id ut leo. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nisl cursus
              tellus eget fringilla eget. Diam eu est id ut leo.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500 text-xl mr-5"></FaStar>
              <p className="text-gray-500">
                <span className="text-black font-bold">4,8</span>(1,873)
              </p>
            </div>

            {/* Quantity and Order */}
            <div className="flex items-center gap-4 my-4">
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white  px-6 py-2 rounded-full">
                Order Now
              </button>
              <button className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-full">
                <ShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="flex text-blue-600  py-2">
                <Share2 className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mx-auto pt-3 my-7">
          {/* Left Section (Tabs & Content) */}
          <div className="flex-1">
            {/* Tabs Section */}
            <div className=" flex gap-6 text-lg font-semibold">
              <Button
                onClick={() => setActiveTab("description")}
                variant="ghost"
                className={`pb-2 ${
                  activeTab === "description"
                    ? "font-bold text-[20px] underline decoration-blue-600 underline-offset-10"
                    : "text-gray-600 text-[20px]"
                }`}
              >
                Description
              </Button>
              <Button
                onClick={() => setActiveTab("reviews")}
                variant="ghost"
                className={`pb-2 ${
                  activeTab === "reviews"
                    ? "font-bold text-[20px] underline decoration-blue-600 underline-offset-4"
                    : "text-gray-600 text-[20px]"
                }`}
              >
                Reviews
              </Button>
            </div>

            {/* Content Section */}
            <div className="mt-6 ml-3">
              {activeTab === "description" && (
                <div className="w-[650px]">
                  <h3 className="text-lg font-bold text-blue-600">
                    Brief Overview
                  </h3>
                  <p className="text-gray-600 mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                    neque mattis molestie eget phasellus tellus amet duis in.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                    neque mattis molestie eget phasellus tellus amet duis in.
                  </p>
                  <StarRating rating={rating} onRatingChange={setRating} />

                  <h3 className="text-lg font-bold mt-7 mb-5 text-blue-600">
                    Detailed Description
                  </h3>
                  <div>
                    {features.map((feature, index) => (
                      <p
                        key={index}
                        className="mt-2 mb-10 text-[#353945] text-[17px]"
                      >
                        <strong className="font-semibold">
                          {feature.title} –
                        </strong>{" "}
                        <span className="font-normal">
                          {feature.description}
                        </span>
                      </p>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mt-4 text-blue-600 mb-10">
                    Color Options
                  </h3>
                  <div className="flex gap-[27px] mt-2">
                    <div className="w-[76px] h-[65px] bg-black "></div>
                    <div className="w-[76px] h-[65px] bg-gray-400 "></div>
                    <div className="w-[76px] h-[65px] bg-[#FF725E]"></div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <p className="text-gray-600">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section (Delivery & Returns) */}
          <div className="w-1/3">
            <div className="bg-gray-100 py-6 rounded-lg px-12">
              <h3 className="text-lg font-semibold mb-10 text-[20px]">
                Delivery & Returns
              </h3>
              <p className="text-gray-600 text-sm text-[14px]">
                <strong>Please Note:</strong> Some sizes, colors or units (if
                you order several) of this product may be shipped from abroad.
                If applicable, customs fees will be calculated and shown at
                checkout, and delivery timelines may vary.
              </p>

              <div className="mt-4">
                <h4 className="text-gray-800 font-semibold mb-5">
                  Choose your location
                </h4>
                <section className="bg-gray-100 space-y-5">
                  <Dropdown
                    className="mb-5"
                    label="State"
                    options={["Lagos State", "Ogun State", "Abuja"]}
                  />
                  <Dropdown
                    label="City"
                    options={["Ijeshatedo Surulere", "Ikeja", "Yaba"]}
                  />
                </section>

                <div className="mt-6">
                  <div className="flex gap-x-3 mb-2">
                    <img src={Delivery} />
                    <div>
                      <p className="text-[16px]">Delivery and Returns</p>
                      <p className="text-[#6E7174] text-[14px]">
                        Delivery Fees{" "}
                        <span className="text-[#FF9900] font-bold">
                          #103000
                        </span>
                      </p>
                    </div>
                  </div>

                  <p>
                    Ready for pickup between 26 March and 28 March if you place
                    your order within the next 14mins
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex gap-x-3 mb-2">
                    <img src={doorDelivery} />
                    <div>
                      <p className="text-[16px]">Door Delivery</p>
                      <p className="text-[#6E7174] text-[14px]">
                        Delivery Fees{" "}
                        <span className="text-[#FF9900] font-bold">
                          #103000
                        </span>
                      </p>
                    </div>
                  </div>

                  <p>
                    Ready for pickup between 26 March and 28 March if you place
                    your order within the next 14mins
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex gap-x-3 mb-2">
                    <img src={returnPolicy} />
                    <div>
                      <p>Return Policy</p>
                      <p className="text-[#6E7174] text-[14px]">
                        Free Delivery{" "}
                        <span className="line-through text-[#6E7174]">
                          #103000
                        </span>{" "}
                      </p>
                    </div>
                  </div>

                  <p>
                    Free return within 7 days for ALL eligible items Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery & Returns Section
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h3 className="text-lg font-semibold">Delivery & Returns</h3>
        <p className="text-gray-600 text-sm">
          <strong>Pickup Mode:</strong> Items arrive within 48 hours to your selected pickup station.
        </p>
      </div> */}

        {/* Related Products Section */}
        <div className="mt-10 p-5">
          <h3 className="text-lg font-semibold">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {productImages.map((image, index) => (
              <div key={index} className=" p-4  relative">
                {/* Product Image */}
                <img
                  src={image}
                  alt="Product"
                  className="w-full h-32 object-contain"
                />

                {/* Product Details */}
                <p className="text-gray-900 font-semibold mt-2">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="text-orange-500 font-bold mb-3">₦103,000</p>

                {/* Star Rating Component */}
                <StarRating />

                {/* Cart Icon (Add to Cart) */}
                <button className="absolute bottom-2 right-5 text-gray-600 hover:text-orange-500 border border-gray-500 p-3 rounded-full">
                  <ShoppingCart size={20} />
                </button>
              </div>
            ))}
            {productImages.map((image, index) => (
              <div key={index} className="p-4 relative">
                {/* Product Image */}
                <img
                  src={image}
                  alt="Product"
                  className="w-full h-32 object-contain"
                />

                {/* Product Details */}
                <p className="text-gray-900 font-semibold mt-2">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="text-orange-500 font-bold mb-3">₦103,000</p>

                {/* Star Rating Component */}
                <StarRating />

                {/* Cart Icon (Add to Cart) */}
                <button className="absolute bottom-2 right-5 text-gray-600 hover:text-orange-500 border border-gray-500 p-3 rounded-full">
                  <ShoppingCart size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

export default Product;
