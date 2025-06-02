import BannerWrapper from "@/components/layouts/home/banner-wrapper";
import Headers from "@/components/layouts/header/Header";

const Homepage = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center">
      <Headers />
      <div className="w-full bg-white z-50 py-5">
        <BannerWrapper />
      </div>

      {/* Top products */}
      {/* <div className="bg-white"></div> */}

      
    </div>
  );
};

export default Homepage;
