import { Product } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: String) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// This capitalizes the first letter of a string
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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

/* FORMAT A PERCENTAGE */
export const formatPercentage = (percentage: number): string => {
  let formattedPercentage: string;

  if (percentage === Infinity) {
    formattedPercentage = "No sales last month";
  } else {
    const sign = percentage >= 0 ? "+" : "-";
    const absPercentageIncrease = Math.abs(percentage);
    formattedPercentage = `${sign}${absPercentageIncrease.toFixed(1)}% from`;
  }

  return formattedPercentage;
};

/* CONVERT LOCAL DATE TO UTC ISO STRING */
export function convertLocalDateToUTC(date: Date | null) {
  if (!date) return undefined;
  const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return utc;
}

/* FILTER PRODUCTS BY TIMEFRAME */
export const filterProductsByTimeFrame = (
  products: Product[],
  timeFrame: string,
  filterOn: string,
  endDate?: Date,
): Product[] => {
  // Set start and end dates for time period
  const end = endDate || new Date();
  end.setHours(0, 0, 0, 0);
  let start = new Date(end);
  switch (timeFrame) {
    case "week":
      start.setDate(end.getDate() - 7);
      break;
    case "month":
      start.setMonth(end.getMonth() - 1);
      break;
    case "year":
      start.setFullYear(end.getFullYear() - 1);
      break;
    default:
      throw new Error("Invalid timeframe");
  }

  // Go through each product
  const filteredProducts = products.filter((product) => {
    // If the product was purchased within the time period, add it to the list
    if (
      filterOn === "sourceDate" &&
      product.sourceDate <= end &&
      product.sourceDate > start
    ) {
      return product;
    }

    // If the product was sold within the time period, add it to the list
    if (
      filterOn === "saleDate" &&
      product.saleDate &&
      product.saleDate <= end &&
      product.saleDate > start
    ) {
      return product;
    }
  });

  return filteredProducts;
};
