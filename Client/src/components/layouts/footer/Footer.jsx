"use client";
import React from "react";
import { footerData, countries } from "./footerData";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import DropdownMenuCountry from "./dropdown_countries";

const iconComponents = {
  FaFacebook,
  FaLinkedin,
  AiFillInstagram,
};

const Footer = () => {
  return (
    <footer className="w-full xl:px-[18%] px-6 py-8 bg-white text-gray-500 text-[12px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {footerData.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold mb-5 text-black">{section.title}</h3>

            {/* Text links */}
            {section.links && (
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i} className="hover:underline cursor-pointer">
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Image groups (payment) */}
            {section.images && (
              <div className="flex flex-wrap gap-2 mt-2">
                {section.images.map((src, i) => (
                  <div key={i} className="px-1 py-1.5 rounded bg-white">
                    <Image
                      src={src}
                      alt="payment"
                      className="object-contain"
                      width={48}
                      height={34}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Social links */}
            {section.socials && (
              <ul className="mt-2 space-y-3">
                {section.socials.map((social, i) => {
                  const IconComponent = iconComponents[social.iconName];
                  return (
                    <li key={i}>
                      <Link
                        href={social.href}
                        className="flex items-center gap-2 hover:underline">
                        <span className="text-[18px]">
                          {IconComponent && <IconComponent />}
                        </span>
                        <span>{social.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* App download with QR */}
            {section.qr && (
              <div className="mt-2 flex gap-2">
                <Image
                  src={section.qr}
                  alt="QR"
                  width={80}
                  height={80}
                  className="mb-2"
                />
                <div className="flex flex-col gap-2 h-20">
                  {section.stores?.map((store, i) => (
                    <Image
                      key={i}
                      src={store.icon}
                      alt={store.name}
                      width={68}
                      height={20}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Below section */}
      <div className="border-t border-gray-300 mt-6 text-sm flex items-center justify-between pt-4">
        <p>© 2025 Ha Dao. All Rights Reserved .</p>
        <div className="hidden md:flex gap-1">
          <div>{countries.title}:</div>
          <ul className="flex gap-2">
            {countries.names.map((name) => (
              <li key={name} className="border-r border-gray-300 pr-2">
                <Link href="#">{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <DropdownMenuCountry />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
