import React, { useState } from 'react'
import naira from "../assets/naira.png"

const ProjectCard = ({imgUrl, title, price, link, slashedprice}) => {
    const [showFullTitle, setShowFullTitle] = useState(false)

    // Ensure title is a valid string to avoid errors
    const titleText = title || ""

    // Display full title or truncated version
    
  return (
    // <div className=''>
    <div className=' bg-white rounded-xl overflow-hidden shadow-md mx-1 '>
        <a href={link} target='blank' className='cursor-pointer group'>                                
        <img src={imgUrl} alt={title} className='w-full  h-72 md:h-80 object-cover' />
        </a>

        <div className=' py-5 '>
            {/* // Display full title or truncated version */}
            {/* <h3 className='text-base font-semibold overflow-hidden text-ellipsis'>{showFullTitle ? titleText : titleText.substring(0, 29) + (titleText.length > 29 ? "..." : "")}</h3> */}

            {/* {titleText.length > 29 && (
                <button className='text-black text-sm'
                    onClick={() => setShowFullTitle((prevState) => !prevState)}
                >
                    {showFullTitle ? "Show Less" : "Show More"}
                </button>
            )} */}
            <h3 className='text-base ml-3 overflow-hidden text-ellipsis'>{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2 items-start">

                {price.map((tag, index) => (
                    <span key={index} className='text-xs flex items-center text-black px-3 py-1 rounded'>
                        <img src={naira} alt="" width={"15rem"} />{tag}
                    </span>
                ))}

            </div>
                <div className='flex flex-wrap gap-2 -mt-1'>
                {price.map((tag, index) => (
                    <span key={index} className='text-xs text-gray-600 px-3 py-1 flex items-center rounded relative w-fit'>
                    <del className='flex items-center'>
                        <img src={naira} alt="" width="15rem" />
                        {slashedprice}
                    </del>
                    <span className='absolute left-3 right-2.5 top-1/2 border-t-2 border-red-500'></span>
                    </span>
                ))}
                </div>
        </div>
    </div>
  )
}

export default ProjectCard