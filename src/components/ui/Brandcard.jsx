
const BrandCard = ({ brandImage1, brandImage2, brandImage3, brandImage4 }) => {
    return (
        <div className="aspect-square grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 border bg-gray-100 border-gray-800 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-700">
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 p-2 sm:p-3 md:p-5 flex justify-center bg-white items-center border border-gray-800 rounded-sm shadow-md md:shadow-xl">
                <img src={brandImage1} alt="brandImage1" className="object-contain w-full h-full" />
            </div>
            <div className="col-start-1 col-end-2 row-start-2 row-end-3 p-2 sm:p-3 md:p-5 flex justify-center bg-white items-center border border-gray-800 rounded-sm shadow-md md:shadow-xl">
                <img src={brandImage2} alt="brandImage2" className="object-contain w-full h-full" />
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-2 p-2 sm:p-3 md:p-5 flex justify-center bg-white items-center border border-gray-800 rounded-sm shadow-md md:shadow-xl">
                <img src={brandImage3} alt="brandImage3" className="object-contain w-full h-full" />
            </div>
            <div className="col-start-2 col-end-3 row-start-2 row-end-3 p-2 sm:p-3 md:p-5 flex justify-center bg-white items-center border border-gray-800 rounded-sm shadow-md md:shadow-xl">
                <img src={brandImage4} alt="brandImage4" className="object-contain w-full h-full" />
            </div>
        </div>
    )
}
export default BrandCard;