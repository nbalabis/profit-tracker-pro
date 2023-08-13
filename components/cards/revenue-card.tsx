import { Product } from "@prisma/client";
import { DollarSign } from "lucide-react";

import {
  calculatePercentRevenueChange,
  calculateTotalRevenue,
} from "@/lib/calculations";
import OverviewCard from "@/components/ui/overview-card";
import { capitalize, formatPercentage, formatPrice } from "@/lib/utils";

interface RevenueCardProps {
  products: Product[];
  timeFrame: string;
}

const RevenueCard: React.FC<RevenueCardProps> = ({ products, timeFrame }) => {
  //calculate total revenue this period
  const revenue = calculateTotalRevenue(products, timeFrame);
  const formattedRevenue = formatPrice(revenue);

  //calculate percentage change from last period
  const percentChange = calculatePercentRevenueChange(products, timeFrame);
  const formattedPercentage = !!percentChange
    ? formatPercentage(percentChange)
    : "No sales";

  return (
    <OverviewCard
      title={`Revenue This ${capitalize(timeFrame)}`}
      Icon={DollarSign}
      value={formattedRevenue}
      change={`${formattedPercentage} last ${timeFrame}`}
    />
  );
};

export default RevenueCard;
