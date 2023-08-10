import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: String) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// This formats a price to USD
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// This formats a date to a string
export function formatDate(date: Date): string {
  const dateOptions: any = {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
  const dateAsFormattedString = dateFormatter.format(date);

  return dateAsFormattedString;
}

/* CONVERT LOCAL DATE TO UTC ISO STRING */
export function convertLocalDateToUTC(date: Date) {
  const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return utc;
}
