import BrandCard from "./ui/Brandcard";
const Brands = ({ brandImageList }) => {
    return (
        <div className="mx-4 md:mx-8 lg:mx-16 mb-6 md:mb-10 mt-3 md:mt-5">
            <div className="px-4 md:px-8 lg:px-16 py-4 md:py-8">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">Shop by Brands</h1>
                </div>
                
                <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] sm:auto-cols-[minmax(250px,1fr)] md:auto-cols-[minmax(280px,1fr)] gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {brandImageList.map((brand, index) => (
                        <div key={index} className="snap-start">
                            <BrandCard 
                                brandImage1={brand.brandImage1}
                                brandImage2={brand.brandImage2}
                                brandImage3={brand.brandImage3}
                                brandImage4={brand.brandImage4}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Brands;