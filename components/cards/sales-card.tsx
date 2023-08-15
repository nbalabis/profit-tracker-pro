import { Product } from "@prisma/client";
import { Tag } from "lucide-react";

import OverviewCard from "@/components/ui/overview-card";
import { capitalize, formatPercentage, formatPrice } from "@/lib/utils";
import {
  calculatePercentSalesChange,
  calculateTotalSales,
} from "@/lib/calculations";

interface SalesCardProps {
  products: Product[];
  timeFrame: string;
}

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
