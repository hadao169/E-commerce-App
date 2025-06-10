"use client";
import * as React from "react";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselImages = Array.from(
  { length: 4 },
  (_, i) => `/images/banners/slide${i + 1}.jpg`
);

export default function HomeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const navBtnClass = "w-3 h-10 md:w-6 md:h-14 lg:w-8 lg:h-18 cursor-pointer";

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full md:w-2/3"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselPrevious className={navBtnClass} />
      <div className="relative flex flex-col items-center w-full">
        <CarouselContent>
          {carouselImages.map((src, index) => (
            <CarouselItem key={index}>
              <CardContent className="flex items-center justify-center p-0">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full object-cover shadow-md"
                  loading="lazy"
                />
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* The dots for the carousel navigation */}
        <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                current === idx + 1 ? "bg-orange-500" : "bg-gray-100"
              }`}
              onClick={() => api?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
      <CarouselNext className={navBtnClass} />
    </Carousel>
  );
}
