import { Product } from "@prisma/client";

/* CALCULATE TOTAL REVENUE FOR GIVEN TIME PERIOD */
export function calculateTotalRevenue(
  products: Product[],
  timeframe: string,
  endDate?: Date,
): number {
  const now = endDate || new Date(); // Use provided endDate or current date
  const filteredProducts = products.filter((product) => {
    if (product.status === "SOLD" && product.saleDate) {
      const diffInMilliseconds = now.getTime() - product.saleDate.getTime();

      switch (timeframe) {
        case "week":
          return (
            diffInMilliseconds <= 7 * 24 * 60 * 60 * 1000 &&
            diffInMilliseconds >= 0
          ); // 1 week in milliseconds
        case "month":
          return (
            diffInMilliseconds <= 30 * 24 * 60 * 60 * 1000 &&
            diffInMilliseconds >= 0
          ); // 30 days in milliseconds
        case "year":
          return (
            diffInMilliseconds <= 365 * 24 * 60 * 60 * 1000 &&
            diffInMilliseconds >= 0
          ); // 365 days in milliseconds
        default:
          return false;
      }
    }
    return false;
  });

  const totalRevenue = filteredProducts.reduce((total, product) => {
    return total + (product.salePrice || 0);
  }, 0);

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
  products.forEach((product) => {
    // If the product was purchased within the time period, subtract it from the total profit
    if (product.sourceDate <= end && product.sourceDate > start) {
      profit -= product.sourcePrice;
    }

    // If the product was sold within the time period, add it to the total profit (minus fees)
    if (
      product.saleDate &&
      product.saleDate <= end &&
      product.saleDate > start
    ) {
      const totalFees =
        (product.shippingFee || 0) +
        (product.tax || 0) +
        (product.miscFee || 0) +
        (product.platformFee || 0);
      profit += product.salePrice || 0 - totalFees;
    }
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
