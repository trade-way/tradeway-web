import { ShoppingCart, Star } from "lucide-react";

const DealCard=({productImage,productName,price,rating})=>{
    return(
        <div className="aspect-square p-2 sm:p-3 md:p-4 hover:shadow-lg rounded-xl md:rounded-2xl transition-shadow duration-300 bg-white">
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
                   <p className="text-base md:text-lg font-bold text-amber-500">${price}</p>
                   <div className="flex items-center gap-0.5 text-xs sm:text-sm">
                        <div className="flex text-amber-400">
                            <Star size={14} className="md:w-4 md:h-4"/>
                            <Star size={14} className="md:w-4 md:h-4"/>
                            <Star size={14} className="md:w-4 md:h-4"/>
                            <Star size={14} className="md:w-4 md:h-4"/>
                            <Star size={14} className="md:w-4 md:h-4"/>
                        </div>
                        <span className="text-gray-500 ml-1">({rating})</span>
                   </div>
                </div>
                <button className="self-end p-1.5 sm:p-2 md:p-2.5 border-2 border-gray-300 rounded-full hover:border-amber-500 hover:bg-amber-50 transition-colors">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
        </div>
    )
}
export default DealCard;