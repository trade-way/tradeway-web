
const TodayDealCard = ({ productname, currentPrice, oldPrice, productImage, view1, view2, view3 }) => {
    return (
        <div className="aspect-square p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="h-35 mb-2 px-5">
                <img src={productImage} alt={productname} className="w-full h-full object-contain" />
            </div>
            
            <p className="text-md font-semibold text-gray-600 h-12 line-clamp-2 mb-1 text-center">
                {productname}
            </p>
            
            <p className="text-lg font-semibold mb-3 text-center">
                ${currentPrice}
                <span className="text-sm text-gray-500 ml-2 line-through">${oldPrice}</span>
            </p>
            
            <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square p-2 border border-gray-400 rounded-lg hover:border-gray-500">
                    <img src={view1} alt="view1" className="w-full h-full object-contain" />
                </div>
                <div className="aspect-square p-2 border border-gray-400 rounded-lg hover:border-gray-500">
                    <img src={view2} alt="view2" className="w-full h-full object-contain" />
                </div>
                <div className="aspect-square p-2 border border-gray-400 rounded-lg hover:border-gray-500">
                    <img src={view3} alt="view3" className="w-full h-full object-contain" />
                </div>
            </div>
        </div>
    )
}
export default TodayDealCard;