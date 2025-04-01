const CategoryItem=({name, Image})=>{
    return (
        <div className="relative flex items-center rounded-xl py-2 sm:py-3 md:py-4 bg-transparent  cursor-pointer w-[200px] sm:w-[240px] md:w-[280px] h-[90px] sm:h-[100px] md:h-[120px] overflow-hidden">
            <h2 className="text-sm sm:text-base md:text-xl w-full font-semibold hover:shadow-lg transition-shadow bg-gray-400 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 mr-2 border rounded-l-2xl">
                {name}
            </h2>
            <img 
                src={Image} 
                alt={name} 
                className="absolute -right-1 sm:right-0 md:right-2 h-[60%] sm:h-[65%] md:h-[70%] object-contain z-10"
            />
        </div>
    )
}

export default CategoryItem;