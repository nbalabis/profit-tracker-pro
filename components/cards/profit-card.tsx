import { Expense, Product } from "@prisma/client";
import { TrendingUp } from "lucide-react";

import OverviewCard from "@/components/ui/overview-card";
import { capitalize, formatPercentage, formatPrice } from "@/lib/utils";
import {
  calculateProfit,
  calculatePercentProfitChange,
} from "@/lib/calculations";

interface ProfitCardProps {
  products: Product[];
  expenses: Expense[];
  timeFrame: string;
}

const ProfitCard: React.FC<ProfitCardProps> = ({
  products,
  expenses,
  timeFrame,
}) => {
  // Calculate total profit this period
  const profit = calculateProfit(products, expenses, timeFrame);
  const formattedProfit = formatPrice(profit);

  // Calculate the change in profit from the previous period
  const percentChange = calculatePercentProfitChange(products, expenses, timeFrame);
  const formattedPercentage =
    percentChange !== null
      ? formatPercentage(percentChange, true)
      : "No transactions";

  return (
    <OverviewCard
      title={`Profit This ${capitalize(timeFrame)}`}
      Icon={TrendingUp}
      value={formattedProfit}
      change={`${formattedPercentage} last ${timeFrame}`}
    />
  );
};

export default ProfitCard;
