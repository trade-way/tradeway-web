import React from 'react'
import { DESIGNPROJECTS } from '../utils/data'
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from 'react'
import {IoIosArrowForward} from "react-icons/io"
import ProjectCard from './ProjectCard'

const DevelopmentCarousel = () => {
    
    const [emblaRefDev, emblaApiDev] = useEmblaCarousel({ loop: false, align: "start" });
  
    const [canScrollPrevDev, setCanScrollPrevDev] = useState(false);
    const [canScrollNextDev, setCanScrollNextDev] = useState(false);
    
  
    const updateButtonsDev = useCallback(() => {
      if (!emblaApiDev) return;
      setCanScrollPrevDev(emblaApiDev.canScrollPrev());
      setCanScrollNextDev(emblaApiDev.canScrollNext());
    }, [emblaApiDev]);
  
    useEffect(() => {
      if (emblaApiDev) {
        emblaApiDev.on("select", updateButtonsDev);
        updateButtonsDev();
      }
    }, [emblaApiDev, updateButtonsDev]);
  
  return (<>
            {/* Top Selling Items Carousel */}
        <div className="mx-auto -mt-16 px-8 md:px-10 py-10">
            <div className="w-full lg:w-[60vw]">
                <h4 className="font-semibold text-3xl">Top selling items</h4>
            </div>

            <div className="relative">
                <div className="overflow-hidden" ref={emblaRefDev}>
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

export default DevelopmentCarousel