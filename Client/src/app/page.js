import BannerWrapper from "@/components/layouts/home/banner-wrapper";
import Headers from "@/components/layouts/header/Header";

const Homepage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Headers />
      <div className="w-full bg-white z-50">
        <BannerWrapper />
      </div>
    </div>
  );
};

export default Homepage;
