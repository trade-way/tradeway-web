import DealCard from "./ui/DealCard";
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext'; // Import the hook

const Deals = ({ dealName, dealList, onViewAllClick, displayStyle }) => {
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct(); // Get the setter function

  const handleCardClick = (product) => {
    console.log("handleCardClick triggered for product:", product); // ADD THIS LINE
    setSelectedProduct(product);
    navigate(`/product-details/${product.id}`);
  };


  return (
    <div className="mx-4 md:mx-8 lg:mx-16 mt-3 md:mt-5 mb-6 md:mb-10">
      <div className="px-4 md:px-8 lg:px-16 py-4 md:py-8">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">{dealName}</h1>
          {dealList && dealList.length > 0 && onViewAllClick && (
            <button onClick={onViewAllClick} className="hover:opacity-90 transition-opacity">
              <span className="py-2 md:py-2.5 px-3 md:px-5 bg-blue-600 text-xs md:text-sm font-semibold text-white rounded-full">
                View All
              </span>
            </button>
          )}
        </div>
        <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] sm:auto-cols-[minmax(220px,1fr)] md:auto-cols-[minmax(250px,1fr)] gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {dealList && dealList.map((dealitem) => (
          <div key={dealitem.id} className="snap-start">
            <DealCard
              onClick={() => handleCardClick(dealitem)} // Pass the entire product
              productName={displayStyle !== "imagePriceOnly" ? dealitem.name : undefined}
              productImage={dealitem.image}
              price={dealitem.current_price}
              oldPrice={displayStyle !== "imagePriceOnly" ? dealitem.initial_price : undefined}
              rating={displayStyle !== "imagePriceOnly" ? dealitem.average_rating : undefined}
              showImageOnly={displayStyle === "imagePriceOnly"}
              productId={dealitem.id} // You might still need the ID for the route
            />
          </div>
          ))}
          {!dealList || dealList.length === 0 && (
            <p>No products found in this section.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deals;