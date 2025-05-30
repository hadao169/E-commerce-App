import React from "react";
import HomeCarousel from "./carousel-slider";
import { quickMenu } from "@/components/layouts/home/quickAcessMenu";

const BannerWrapper = () => {
  return (
    <div className="w-full xl:px-[18%] px-6 pb-3 text-[15px] transition-opacity duration-200 z-50 mt-6 mb-2">
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
      {/* <div>
        {quickMenu.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors duration-200">
            <img
              src={item.icon}
              alt={item.label}
              className="w-6 h-6 object-contain"
            />
            <span>{item.label}</span>
          </a>
        ))}
      </div> */}
    </div>
  );
};

export default BannerWrapper;
