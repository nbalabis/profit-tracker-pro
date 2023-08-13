import { Product } from "@prisma/client";

import { filterProductsByTimeFrame } from "./utils";

/* CALCULATE TOTAL REVENUE FOR GIVEN TIME PERIOD */
export function calculateTotalRevenue(
  products: Product[],
  timeFrame: string,
  endDate?: Date,
): number {
  let totalRevenue = 0;

  // Get lists of filtered products
  const filteredProductsBySaleDate = filterProductsByTimeFrame(
    products,
    timeFrame,
    "saleDate",
    endDate,
  );

  filteredProductsBySaleDate.forEach(
    (product) => (totalRevenue += product.salePrice || 0),
  );

  return totalRevenue;
}

/* CALCULATE PERCENT CHANGE IN REVENUE FOR GIVEN TIME PERIOD */
export function calculatePercentRevenueChange(
  products: Product[],
  timeframe: string,
): number | null {
  const currentDate = new Date();
  const prevDate = new Date(currentDate);

  switch (timeframe) {
    case "week":
      prevDate.setDate(currentDate.getDate() - 7);
      break;
    case "month":
      prevDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "year":
      prevDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    default:
      throw new Error("Invalid timeframe");
  }
  const currentRevenue = calculateTotalRevenue(
    products,
    timeframe,
    currentDate,
  );

  const prevRevenue = calculateTotalRevenue(products, timeframe, prevDate);

  if (prevRevenue === 0) {
    return null; // Handle divide by zero
  }

  const percentChange = ((currentRevenue - prevRevenue) / prevRevenue) * 100;
  return percentChange;
}

/* CALCULATE TOTAL PROFITS FOR GIVEN TIME PERIOD */
export const calculateProfit = (
  products: Product[],
  timeFrame: string,
  endDate?: Date,
): number => {
  let profit = 0;

  // Get lists of filtered products
  const filteredProductsBySourceDate = filterProductsByTimeFrame(
    products,
    timeFrame,
    "sourceDate",
    endDate,
  );
  const filteredProductsBySaleDate = filterProductsByTimeFrame(
    products,
    timeFrame,
    "saleDate",
    endDate,
  );

  // For products purchased within the time period, subtract it from the total profit
  filteredProductsBySourceDate.forEach(
    (product) => (profit -= product.sourcePrice),
  );

  // For products sold within the time period, add it to the total profit (minus fees)
  filteredProductsBySaleDate.forEach((product) => {
    const totalFees =
      (product.shippingFee || 0) +
      (product.tax || 0) +
      (product.miscFee || 0) +
      (product.platformFee || 0);
    profit += product.salePrice || 0 - totalFees;
  });

  return profit;
};

/* CALCULATE PERCENT CHANGE IN REVENUE FOR GIVEN TIME PERIOD */
export const calculatePercentProfitChange = (
  products: Product[],
  timeFrame: string,
): number | null => {
  // Calculate profit for current time period
  const currentProfit = calculateProfit(products, timeFrame);

  // Determine previous time period endDate
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  switch (timeFrame) {
    case "week":
      endDate.setDate(endDate.getDate() - 7);
      break;
    case "month":
      endDate.setMonth(endDate.getMonth() - 1);
      break;
    case "year":
      endDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      throw new Error("Invalid timeframe");
  }

  // Calculate profit for previous time period
  const prevProfit = calculateProfit(products, timeFrame, endDate);

  if (prevProfit === 0) {
    return null; // Handle divide by zero
  }

  const percentChange = ((currentProfit - prevProfit) / prevProfit) * 100;
  return percentChange;
};
