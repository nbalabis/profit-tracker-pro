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
    profit += (product.salePrice || 0) - totalFees;
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

/* CALCULATE ROI FOR GIVEN TIME PERIOD */
export const calculateROI = (
  products: Product[],
  timeFrame: string,
  endDate?: Date,
): number | null => {
  // Calculate profit for current time period
  const profit = calculateProfit(products, timeFrame, endDate);

  // Get products sourced and sold within the time period
  const productsSourced = filterProductsByTimeFrame(
    products,
    timeFrame,
    "sourceDate",
    endDate,
  );
  const productsSold = filterProductsByTimeFrame(
    products,
    timeFrame,
    "saleDate",
    endDate,
  );

  // Calculate total expenses for this time period
  let expenses = 0;
  productsSourced.forEach((product) => (expenses += product.sourcePrice));
  productsSold.forEach((product) => {
    const totalFees =
      (product.shippingFee || 0) +
      (product.tax || 0) +
      (product.miscFee || 0) +
      (product.platformFee || 0);

    expenses += totalFees;
  });

  if (expenses === 0) {
    return null; // Handle divide by zero
  }

  // Calculate and return ROI
  const roi = (profit / expenses) * 100;
  return roi;
};

/* CALCULATE PERCENT CHANGE IN ROI FOR GIVEN TIME PERIOD */
export const calculatePercentROIChange = (
  products: Product[],
  timeFrame: string,
): number | null => {
  // Calculate ROI for current time period
  const currentROI = calculateROI(products, timeFrame);

  if (currentROI === null) {
    return null;
  }

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

  // Calculate ROI for previous time period
  const prevROI = calculateROI(products, timeFrame, endDate);

  if (prevROI === null) {
    return null; // Handle divide by zero
  }

  const percentChange = ((currentROI - prevROI) / prevROI) * 100;
  return percentChange;
};

/* CALCULATE TOTAL SALES FOR GIVEN TIME PERIOD */
export const calculateTotalSales = (
  products: Product[],
  timeFrame: string,
  endDate?: Date,
) => {
  // Get products sold within the time period
  const productsSold = filterProductsByTimeFrame(
    products,
    timeFrame,
    "saleDate",
    endDate,
  );

  // Add up total sales for this time period
  let totalSales = 0;
  productsSold.forEach((product) => totalSales++);

  return totalSales;
};

/* CALCULATE PERCENT CHANGE IN TOTAL SALES FOR GIVEN TIME PERIOD */
export const calculatePercentSalesChange = (
  products: Product[],
  timeFrame: string,
) => {
  // Calculate total sales for current time period
  const currentSales = calculateTotalSales(products, timeFrame);

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

  // Calculate total sales for previous time period
  const prevSales = calculateTotalSales(products, timeFrame, endDate);

  if (prevSales === 0) {
    return null; // Handle divide by zero
  }

  const percentChange = ((currentSales - prevSales) / prevSales) * 100;
  return percentChange;
};
