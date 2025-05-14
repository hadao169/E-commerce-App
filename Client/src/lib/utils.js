import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export function formatPrice(price, locale = "en") {
//   return new Intl.NumberFormat(locale, {
//     style: "currency",
//     currency: locale === "en" ? "Euro" : "VND",
//   }).format(price);
// }

// export function formatDate(date, locale = "en") {
//   return new Intl.DateTimeFormat(locale, {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(new Date(date));
// }

// export function getErrorMessage(error) {
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return String(error);
// }
