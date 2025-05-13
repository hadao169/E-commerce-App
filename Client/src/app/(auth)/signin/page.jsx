import React from "react";
import SignInForm from "@/components/Auth/SigninForm";
import Link from "next/link";
import { SiShopee } from "react-icons/si";
import Footer from "@/components/layouts/footer/Footer";

const SignInPage = (props) => {
  return (
    <div className="w-full h-screen transition-opacity duration-200">
      <header className="flex items-center justify-between xl:px-[18%] px-6 pt-3 pb-5 text-[15px] text-orange-600">
        <div className="flex items-end gap-4">
          <Link href="/" className="flex gap-2 items-end">
            <SiShopee className="text-[45px]" />
            <h1 className="text-[30px]">Shopee</h1>
          </Link>
          <p className="text-black text-2xl hidden md:block">Log in</p>
        </div>
        <span>Need help?</span>
      </header>
      <main className="w-full bg-[#d0011b]  flex flex-col xl:flex-row xl:px-[18%] px-6 py-10 xl:py-0 items-center">
        <div className="h-full ml-2">
          <img src="/images/loginpage.png" className="h-full object-cover" />
        </div>
        <div className="w-full xl:w-1/2">
          <SignInForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
