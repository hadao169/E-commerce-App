import React from "react";
import HomeCarousel from "./carousel-slider";
import Categories from "@/components/layouts/home/catergories";

const BannerWrapper = () => {
  return (
    <div className="w-full xl:px-[18%] px-6 text-[15px] transition-opacity duration-200 z-50">
      <div className="flex flex-col md:flex-row w-full gap-1.5">
        {/* Carousel bên trái */}
        <HomeCarousel />
        {/* Banner bên phải */}
        <div className="hidden md:flex flex-1 flex-row md:flex-col h-full gap-1.5">
          <img
            src="/images/banners/banner1.jpg"
            alt="Banner Slide 1"
            className="object-cover shadow-lg"
          />
          <img
            src="/images/banners/banner2.jpg"
            alt="Banner Slide 2"
            className="object-cover shadow-lg"
          />
        </div>
      </div>

      <div>
        <Categories />
      </div>
    </div>
  );
};

export default BannerWrapper;
