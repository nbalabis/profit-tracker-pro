import { Product } from "@prisma/client";
import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculatePercentRevenueChange,
  calculateTotalRevenue,
} from "@/lib/calculations";
import { formatPercentage, formatPrice } from "@/lib/utils";

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
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">
          Total Revenue This Month
        </CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <>
          <div className="text-3xl font-bold">{formattedRevenue}</div>
          <p className="pt-1 text-sm text-muted-foreground">
            {formattedPercentage} last {timeFrame}
          </p>
        </>
      </CardContent>
    </Card>
  );
};

export default RevenueCard;
