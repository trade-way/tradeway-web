import { addToCart } from '../services/api/cartService';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import DealCard from "./ui/DealCard";
import { useState } from 'react'; // Import useState

const Deals = ({ dealName, dealList, onViewAllClick, displayStyle, scrollDirection }) => {
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();
  const [notification, setNotification] = useState(null); // State for notification

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    navigate(`/product-details/${product.id}`);
  };

  const handleAddToCart = async (productId, productName) => {
    try {
      const response = await addToCart(productId);

      if (response.ok) {
        console.log("product added to cart:", response.data)
        setNotification({ type: 'success', message: `${productName} added to cart!` });
        // Optional: Trigger a cart refresh here if needed
        // If you're using the CartContext you could call its fetchCart method
      } else {
        setNotification({
          type: 'error',
          message: `Failed to add to cart: ${response.statusText || 'Unknown error'}`
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setNotification({ type: 'error', message: "Failed to add to cart." });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getGridClass = () => {
    if (scrollDirection === "horizontal") {
      return "grid grid-flow-col auto-cols-[minmax(200px,1fr)] sm:auto-cols-[minmax(220px,1fr)] md:auto-cols-[minmax(250px,1fr)] gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory";
    } else if (scrollDirection === "vertical") {
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 overflow-y-auto max-h-[600px] md:max-h-[800px] scrollbar-hide";
    }
    return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"; // Default grid
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 mt-3 md:mt-5 mb-6 md:mb-10">
      <div className="px-4 md:px-8 lg:px-16 py-4 md:py-8">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">{dealName}</h1>
          {dealList?.length > 0 && onViewAllClick && (
            <button onClick={onViewAllClick} className="hover:opacity-90 transition-opacity">
              <span className="py-2 md:py-2.5 px-3 md:px-5 bg-blue-600 text-xs md:text-sm font-semibold text-white rounded-full">
                View All
              </span>
            </button>
          )}
        </div>

        {notification && (
          <div className={`mb-4 p-3 rounded-md text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {notification.message}
          </div>
        )}

        <div className={getGridClass()}>
          {dealList && dealList.length > 0 ? (
            dealList.map((dealitem) => (
              <div key={dealitem.id} className="">
                <DealCard
                  onClick={() => handleCardClick(dealitem)}
                  onAddToCart={handleAddToCart} // Pass the handleAddToCart function
                  productName={displayStyle !== "imagePriceOnly" ? dealitem.name : undefined}
                
                  productImage={dealitem.image}
                  price={dealitem.current_price}
                  oldPrice={displayStyle !== "imagePriceOnly" ? dealitem.initial_price : undefined}
                  rating={displayStyle !== "imagePriceOnly" ? dealitem.average_rating : undefined}
                  showImageOnly={displayStyle === "imagePriceOnly"}
                  showNameDescriptionOnly={displayStyle === "nameDescriptionOnly"} // New prop
                  productId={dealitem.id}
                />
              </div>
            ))
          ) : (
            <p>No products found in this section.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deals;