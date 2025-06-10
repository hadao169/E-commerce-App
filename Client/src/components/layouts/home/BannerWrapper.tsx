/* eslint-disable @next/next/no-img-element */
import React from "react";
import HomeCarousel from "./CarouselSlider";
import Category from "@/components/layouts/home/Catergory";

const BannerWrapper = () => {
  return (
    <div>
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
      <Category />
    </div>
  );
};

export default BannerWrapper;
