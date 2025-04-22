import { ShoppingCart, Star } from "lucide-react";
import { addToCart as addToCartService } from "../../services/api/cartService";

const DealCard = ({ onClick, productImage, productName, price, rating, productId, onAddToCart, productDescription }) => {
  const handleAddToCartClick = async (event) => {
    event.stopPropagation();

    if (onAddToCart) {
      // Use the function passed from parent
      onAddToCart(productId, productName, event);
    } else {
      // Use the service directly as fallback
      try {
        const response = await addToCartService(productId);

        if (response.ok) {
          alert(`${productName || 'Product'} added to cart successfully!`);
        } else {
          alert(`Failed to add product: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("An error occurred while adding the product to cart.");
      }
    }
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div
      className="aspect-square mt-10 p-2 sm:p-3 md:p-4 hover:shadow-lg rounded-xl md:rounded-2xl transition-shadow duration-300 bg-white cursor-pointer flex flex-col" // Changed to flex column
      onClick={onClick}
    >
      <div className="w-full h-[65%] md:h-[55%] mb-2 md:mb-1 flex-grow"> {/* Allow image to take more space */}
        <img
          src={productImage}
          alt={productName}
          className="object-contain h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-between h-[40%] md:h-[45%]"> {/* Container for text and button */}
        <div className="flex flex-col justify-start w-full">
          {productName && <p className="text-xs sm:text-sm font-semibold text-black line-clamp-2">{productName}</p>}
          {productDescription && <p className="text-xs text-gray-600 line-clamp-2">{productDescription}</p>}
          {price && <p className="text-base md:text-lg font-bold text-amber-500">${parseFloat(price).toFixed(2)}</p>}
          {rating && (
            <div className="flex items-center gap-0.5 text-xs sm:text-sm">
              <div className="flex text-amber-400">
                {Array.from({ length: fullStars }).map((_, index) => (
                  <Star key={`full-${index}`} size={14} className="md:w-4 md:h-4 fill-amber-400" />
                ))}
                {hasHalfStar && (
                  <Star key="half" size={14} className="md:w-4 md:h-4 fill-amber-400 opacity-50" />
                )}
                {Array.from({ length: emptyStars }).map((_, index) => (
                  <Star key={`empty-${index}`} size={14} className="md:w-4 md:h-4 text-gray-300" />
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCartClick}
          className="self-end mb-20 p-1.5 sm:p-2 md:p-2.5 border-2 border-gray-300 rounded-full hover:border-amber-500 hover:bg-amber-50 transition-colors mt-2" // Added mt-2 for spacing
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default DealCard;