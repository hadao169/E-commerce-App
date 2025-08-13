import BannerWrapper from "@/components/layouts/home/BannerWrapper";
import Header from "@/components/layouts/header/Header";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/services/api/product";
import { Suspense } from "react";

const Homepage = async () => {
  // update limit field to determine how many items will be fetched
  const products = await getAllProducts();
  return (
    <div className="bg-gray-100 pb-10">
      <Suspense
        fallback={
          <div className="w-full h-20 bg-gray-200 animate-pulse"></div>
        }>
        <Header />
      </Suspense>
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

          <div className="mt-2 px-2">
            {/* Render product cards */}
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
