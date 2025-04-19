import TodayDealCard from "../components/ui/TodayDealCard"
const TodayDeal = ({ Todayitems }) => {
    return (
        <div className="mx-4 md:mx-8 lg:mx-16 mt-3 md:mt-5">
            <div className="px-4 md:px-8 lg:px-16 py-4 md:py-8">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">Today's Deals</h1>
                    <a href="#" className="hover:opacity-90 transition-opacity">
                        <span className="py-2 md:py-2.5 px-3 md:px-5 bg-blue-600 text-xs md:text-sm font-semibold text-white rounded-full">
                            View All
                        </span>
                    </a>
                </div>
                <div className="grid grid-flow-col auto-cols-[minmax(240px,1fr)] md:auto-cols-[minmax(280px,1fr)] lg:auto-cols-[minmax(300px,1fr)] gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {
                        Todayitems.map((todayitem, index) => (
                            <div key={index} className="snap-start">
                                <TodayDealCard 
                                    productname={todayitem.productname} 
                                    currentPrice={todayitem.currentPrice} 
                                    oldPrice={todayitem.oldPrice} 
                                    productImage={todayitem.productImage} 
                                    view1={todayitem.view1} 
                                    view2={todayitem.view2} 
                                    view3={todayitem.view3} 
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}
export default TodayDeal;