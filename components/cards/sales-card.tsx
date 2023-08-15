import { Product } from "@prisma/client";
import { Tag } from "lucide-react";

import OverviewCard from "@/components/ui/overview-card";
import { capitalize, formatPercentage } from "@/lib/utils";

interface SalesCardProps {
  products: Product[];
  timeFrame: string;
}

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

const SalesCard: React.FC<SalesCardProps> = ({ products, timeFrame }) => {
  // Calculate total sales this period
  const profit = calculateTotalSales(products, timeFrame);
  // Calculate the change in sales from the previous period
  const percentChange = calculatePercentSalesChange(products, timeFrame);
  const formattedPercentage =
    percentChange !== null ? formatPercentage(percentChange, true) : "No sales";

  return (
    <OverviewCard
      title={`Sales This ${capitalize(timeFrame)}`}
      Icon={Tag}
      value={profit}
      change={`${formattedPercentage} last ${timeFrame}`}
    />
  );
};

export default SalesCard;
