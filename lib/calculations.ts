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
