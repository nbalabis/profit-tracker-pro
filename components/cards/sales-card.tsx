import { Product } from "@prisma/client";
import { Tag } from "lucide-react";

import OverviewCard from "@/components/ui/overview-card";
import { capitalize, formatPercentage, formatPrice } from "@/lib/utils";
import { calculatePercentSalesChange } from "@/lib/calculations";

interface SalesCardProps {
  products: Product[];
  timeFrame: string;
}

const SalesCard: React.FC<SalesCardProps> = ({ products, timeFrame }) => {
  /*****  TEST *****/
  console.log("All products: ", products);

  /* FILTER PRODUCTS BY TIMEFRAME */
  const filterProductsByTimeFrame = (
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
    console.log("Start: ", start, " End: ", end);
    return filteredProducts;
  };

  /* CALCULATE TOTAL SALES FOR GIVEN TIME PERIOD */
  const calculateTotalSales = (
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
    console.log("Products sold: ", productsSold);
    // Add up total sales for this time period
    let totalSales = 0;
    productsSold.forEach((product) => totalSales++);

    return totalSales;
  };
  /*****  TEST *****/

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
