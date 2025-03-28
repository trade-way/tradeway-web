import DealCard from "./ui/DealCard";

const Deals = ({ dealName,dealList }) => {
    return (
        <div className="mx-4 md:mx-8 lg:mx-16 mt-3 md:mt-5 mb-6 md:mb-10">
            <div className="px-4 md:px-8 lg:px-16 py-4 md:py-8">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">{dealName}</h1>
                    <a href="#" className="hover:opacity-90 transition-opacity">
                        <span className="py-2 md:py-2.5 px-3 md:px-5 bg-blue-600 text-xs md:text-sm font-semibold text-white rounded-full">
                            View All
                        </span>
                    </a>
                </div>
                <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] sm:auto-cols-[minmax(220px,1fr)] md:auto-cols-[minmax(250px,1fr)] gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {dealList.map((dealitem, index) => (
                        <div key={index} className="snap-start">
                            <DealCard 
                                productName={dealitem.productName} 
                                productImage={dealitem.productImage} 
                                price={dealitem.price} 
                                rating={dealitem.rating} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Deals;