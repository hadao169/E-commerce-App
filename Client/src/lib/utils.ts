import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale = "en") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: locale === "en" ? "EUR" : "VND",
  }).format(price);
}

type MonthFormat = 'short' | 'long';
export function formatDate(
  date: Date,
  language: string = 'en-US',
  monthFormat: MonthFormat = 'short'
): string {
  return date.toLocaleDateString(language, {
    day: '2-digit',
    month: monthFormat,
  }).replace('/', ' ');
}

export function errorMessage(error: Error) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
