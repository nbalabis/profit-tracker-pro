import { Product } from "@prisma/client";
import { Percent } from "lucide-react";

import OverviewCard from "@/components/ui/overview-card";
import { capitalize, formatPercentage } from "@/lib/utils";
import { calculateROI, calculatePercentROIChange } from "@/lib/calculations";

interface ROICardProps {
  products: Product[];
  timeFrame: string;
}

const ROICard: React.FC<ROICardProps> = ({ products, timeFrame }) => {
  // Calculate total ROI this period
  const roi = calculateROI(products, timeFrame);
  let formattedROI = "N/A";
  if (roi) formattedROI = formatPercentage(roi, false);

  // Calculate the change in roi from the previous period
  const percentChange = calculatePercentROIChange(products, timeFrame);
  const formattedPercentage =
    percentChange !== null ? formatPercentage(percentChange, true) : "No ROI";

  return (
    <OverviewCard
      title={`ROI This ${capitalize(timeFrame)}`}
      Icon={Percent}
      value={formattedROI}
      change={`${formattedPercentage} last ${timeFrame}`}
    />
  );
};

export default ROICard;
