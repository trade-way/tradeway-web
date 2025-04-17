import React from 'react'
import { DESIGNPROJECTS } from '../utils/data'
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from 'react'
import {IoIosArrowForward} from "react-icons/io"
import ProjectCard from './ProjectCard'

const YouMayALsoLikeCarousel = () => {
    
    const [emblaRefLike, emblaApiLike] = useEmblaCarousel({ loop: false, align: "start" });
  
    const [canScrollPrevLike, setCanScrollPrevLike] = useState(false);
    const [canScrollNextLike, setCanScrollNextLike] = useState(false);
    
  
    const updateButtonsLike = useCallback(() => {
      if (!emblaApiLike) return;
      setCanScrollPrevLike(emblaApiLike.canScrollPrev());
      setCanScrollNextLike(emblaApiLike.canScrollNext());
    }, [emblaApiLike]);
  
    useEffect(() => {
      if (emblaApiLike) {
        emblaApiLike.on("select", updateButtonsLike);
        updateButtonsLike();
      }
    }, [emblaApiLike, updateButtonsLike]);
  
  return (<>
            {/* Top Selling Items Carousel */}
        <div className="mx-auto -mt-16 px-8 md:px-10 py-10">
            <div className="w-full lg:w-[60vw]">
                <h4 className="font-semibold text-3xl">You may also Like</h4>
            </div>

            <div className="relative">
                <div className="overflow-hidden" ref={emblaRefLike}>
                    <div className="flex pt-14 pb-8">
                        {/* {DESIGNPROJECTS.filter(project => project.id >= 1 && project.id <= 5).map((project) =>( */}
                        {DESIGNPROJECTS.map((project) =>(
                        <div 
                            key={project.id}    
                            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[25%]">
                                <ProjectCard 
                                    key={project.id}
                                    imgUrl={project.image}
                                    title={project.title}
                                    price={project.price}
                                    link={project.Link}
                                    slashedprice={project.slashedprice}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
</>
  )
}

export default YouMayALsoLikeCarousel