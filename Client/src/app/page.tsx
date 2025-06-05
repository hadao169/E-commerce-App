import BannerWrapper from "@/components/layouts/home/BannerWrapper";
import Headers from "@/components/layouts/header/Header";
import ProductCard from "@/components/product/ProductCard";

const Homepage = () => {
  return (
    <div className="bg-gray-100 pb-10">
      <Headers />
      <div className="  flex flex-col items-center gap-6">
        <div className="w-full bg-white z-50 py-5 responsive-padding-x text-[15px] transition-opacity duration-200">
          <BannerWrapper />
        </div>

        {/* Top products */}
        {/* <div className="bg-white"></div> */}

        {/*get all products*/}
        <div className="w-full responsive-padding-x">
          <div className="bg-white h-12 flex items-center justify-center text-lg text-orange-500 border-b-[3px] ">
            DAILY DISCOVER
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-2 px-1">
            {/* Render product cards */}
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
