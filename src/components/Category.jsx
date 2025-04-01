import CategoryItem from "./ui/CategoryItem";

const Category = ({ categoryItem }) => {
    return (
        <section className="relative mb-10 md:mb-20 p-4 md:p-10 -mt-20 md:-mt-60 bg-white mx-4 md:mx-10 rounded-t-2xl">
            <h1 className="font-bold text-lg md:text-xl ml-2 md:ml-3 mb-4">Category</h1>
            
            {/* category item */}
            <div className="flex overflow-x-auto scrollbar-hide p-2 gap-4">
                {
                    categoryItem.map((item, index) => (
                        <CategoryItem key={index} name={item.name} Image={item.image} />
                    ))
                }
            </div>
            
            {/* Featured products */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-6">
                {/* First Product Card */}
                <div className="relative md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center bg-gray-800 justify-center h-[200px] md:h-[70%] rounded-t-md">
                        <img src="./images/categoryImage/Headsets.png" alt="JBL Tour One" className="h-[80%] w-auto object-contain" />
                    </div>
                    <p className="flex items-center justify-center bg-black text-center h-[60px] md:h-[30%] text-gray-200 py-3 rounded-b-md">JBL Tour One</p>
                    <span className="absolute -top-2 -right-2 py-1 px-2 bg-green-500 text-xs rounded-md font-semibold text-white">
                        New
                    </span>
                </div>

                {/* Second Product Card */}
                <div className="relative md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center bg-gray-800 justify-center h-[200px] md:h-[70%] rounded-t-md">
                        <img src="./images/categoryImage/earphones.png" alt="boAt Rockerz" className="h-[80%] w-auto object-contain" />
                    </div>
                    <p className="flex items-center justify-center bg-black text-center h-[60px] md:h-[30%] text-gray-200 py-3 rounded-b-md">boAt Rockerz 255</p>
                    <span className="absolute -top-2 -right-2 py-1 px-2 bg-red-600 text-xs rounded-md font-semibold text-white">
                        30% Off
                    </span>
                </div>
                
                {/* Banner Image */}
                <div className="md:col-start-2 md:col-end-7 md:row-start-1 md:row-end-4 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                    <img 
                        src="./images/categoryImage/Banner.png" 
                        alt="Featured Banner" 
                        className="w-full h-full object-cover md:object-contain rounded-2xl" 
                    />
                </div>
            </div>
        </section>
    )
}


export default Category;