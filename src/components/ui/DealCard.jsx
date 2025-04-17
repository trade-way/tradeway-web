import { ShoppingCart, Star } from "lucide-react";
import { addToCart } from "../../services/api/cartService"; // Import the cart service function

const DealCard = ({ onClick, productImage, productName, price, rating, productId }) => {
  const handleAddToCartClick = async (event) => {
    event.stopPropagation(); // Prevent the card's onClick when clicking the cart button
    try {
      const response = await addToCart(productId);
      console.log("Added to cart:", response);
      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div
      className="aspect-square p-2 sm:p-3 md:p-4 hover:shadow-lg rounded-xl md:rounded-2xl transition-shadow duration-300 bg-white cursor-pointer"
      onClick={onClick} // Use the onClick prop here
    >
      <div className="w-full h-[60%] md:h-[65%] mb-2 md:mb-3">
        <img
          src={productImage}
          alt={productName}
          className="object-contain h-full w-full"
        />
      </div>
      <div className="flex justify-between h-[35%] md:h-[30%]">
        <div className="flex flex-col justify-between">
          <p className="text-xs sm:text-sm font-semibold text-black line-clamp-2">{productName}</p>
          <p className="text-base md:text-lg font-bold text-amber-500">${parseFloat(price).toFixed(2)}</p> {/* Format price */}
          <div className="flex items-center gap-0.5 text-xs sm:text-sm">
            <div className="flex text-amber-400">
              {Array.from({ length: Math.floor(rating) }).map((_, index) => (
                <Star key={index} size={14} className="md:w-4 md:h-4" />
              ))}
              {rating % 1 !== 0 && (
                <Star key="half" size={14} className="md:w-4 md:h-4 fill-amber-400" />
              )}
              {Array.from({ length: 5 - Math.round(rating) }).map((_, index) => (
                <Star key={`empty-${index}`} size={14} className="md:w-4 md:h-4 text-gray-300" />
              ))}
            </div>
            <span className="text-gray-500 ml-1">({parseFloat(rating).toFixed(1)})</span> {/* Format rating */}
          </div>
        </div>
        <button
          onClick={handleAddToCartClick}
          className="self-end p-1.5 sm:p-2 md:p-2.5 border-2 border-gray-300 rounded-full hover:border-amber-500 hover:bg-amber-50 transition-colors"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
export default DealCard;