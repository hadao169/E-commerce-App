import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import socialLinks from "@/constants/socialLinks";

export const footerData = [
  {
    title: "CUSTOMER SERVICE",
    links: [
      { text: "Help Centre", href: "#" },
      { text: "Payment Methods", href: "#" },
      { text: "Return & Refund", href: "#" },
      { text: "Contact Us", href: "#" },
    ],
  },
  {
    title: "ABOUT SHOPEE",
    links: [
      { text: "About Us", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Shopee Blog", href: "#" },
      { text: "Shopee Mall", href: "#" },
    ],
  },
  {
    title: "PAYMENT",
    images: [
      "/images/payment/visa.png",
      "/images/payment/mastercard.png",
      "/images/payment/amex.png",
      "/images/payment/shopeepay.png",
    ],
  },
  {
    title: "FOLLOW US",
    socials: [
      { name: "Facebook", href: socialLinks.github },
      { name: "Instagram", href: socialLinks.portfolio },
      { name: "LinkedIn", href: socialLinks.linkedin },
    ]
  },
  {
    title: "SHOPEE APP DOWNLOAD",
    qr: "/images/payment/qrcode.png",
    stores: [
      { name: "App Store", icon: "/images/download/appleStore.png" },
      { name: "Google Play", icon: "/images/download/googleplay.png" },
      { name: "AppGallery", icon: "/images/download/huaweiPlay.png" },
    ],
  },
];

export const countries = {
  title: "Country & Region",
  names: [
    "Singapore",
    "Indonesia",
    "Thailand",
    "Malaysia",
    "Vietnam",
    "Philippines",
    "Brazil",
    "México",
    "Colombia",
    "Chile",
    "Taiwan",
  ],
};
