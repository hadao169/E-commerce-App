import Link from "next/link";
import React from "react";
import { SiShopee } from "react-icons/si";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
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
      <div className="w-full bg-[#d0011b]"> {children}</div>
    </section>
  );
}
