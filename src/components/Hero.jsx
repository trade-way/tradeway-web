import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="w-full ">
      <Carousel 
        className="w-full "
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-[100vh]">
          <CarouselItem className="h-full">
            <div className="relative w-full h-full">
              <img 
                src="/images/image 1.png" 
                alt="Slide 1" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full h-full">
              <img 
                src="/images/image 2.png" 
                alt="Slide 2" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full h-full">
              <img 
                src="/images/image 3.png" 
                alt="Slide 3" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Hero;