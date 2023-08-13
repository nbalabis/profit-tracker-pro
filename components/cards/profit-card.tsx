import { Product } from "@prisma/client";
import { DollarSign } from "lucide-react";

import OverviewCard from "@/components/ui/overview-card";
import { capitalize, formatPercentage, formatPrice } from "@/lib/utils";
import {
  calculateProfit,
  calculatePercentProfitChange,
} from "@/lib/calculations";

interface ProfitCardProps {
  products: Product[];
  timeFrame: string;
}

const ProfitCard: React.FC<ProfitCardProps> = ({ products, timeFrame }) => {
  // Calculate total profit this period
  const profit = calculateProfit(products, timeFrame);
  const formattedRevenue = formatPrice(profit);

  // Calculate the change in profit from the previous period
  const percentChange = calculatePercentProfitChange(products, timeFrame);
  const formattedPercentage = !!percentChange
    ? formatPercentage(percentChange)
    : "No transactions";

  return (
    <OverviewCard
      title={`Profit This ${capitalize(timeFrame)}`}
      Icon={DollarSign}
      value={formattedRevenue}
      change={`${formattedPercentage} last ${timeFrame}`}
    />
  );
};

export default ProfitCard;
