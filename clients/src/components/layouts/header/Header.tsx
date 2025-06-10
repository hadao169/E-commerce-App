"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import socialLinks from "@/constants/socialLinks";
import LanguageSwitcher from "./LanguageSwitcher";
// import MobileMenu from "./mobileMenu";
import Menu from "./MobileMenu";
import Searchbar  from "./Searchbar";
import Link from "next/link";
import searchSuggestions from "./trendingSearch";
import CartButton from "./CartButton";
import UserButton from "./UserButton";

const Header = () => {
  return (
    <header className=" bg-orange-600 w-full responsive-padding-x pb-3 text-white text-[15px] transition-opacity duration-200 z-50">
      <div>
        {/* Phần trên search bar */}
        <div className="flex items-center justify-between pb-2">
          <div className="hidden md:flex items-center gap-2">
            <div>Follow us on</div>
            <a href={socialLinks.github} className="text-[18px]">
              <FaGithub />
            </a>
            <a href={socialLinks.linkedin} className="text-[18px]">
              <FaLinkedin />
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
            <UserButton />
          </div>
        </div>

        {/* Phần dưới search bar */}
        <div className="flex items-start justify-between md:gap-8">
          <Link href="/" className="flex gap-2">
            <SiShopee className="text-[45px]" />
            <h1 className="self-end text-[30px]">Shopee</h1>
          </Link>

          {/* Searchbar */}
          <div className="w-full max-w-[800px] min-w-[100px] hidden md:block">
            <Searchbar />
            {/* <ul className="hidden md:flex text-xs gap-3 mt-2">
              {searchSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul> */}
          </div>
          <Link href="/cart" className="hidden md:flex mt-2">
            <CartButton />
          </Link>
          <Menu />
        </div>

        {/* Searchbar cho mobile */}
        <div className="md:hidden mt-3">
          <Searchbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
