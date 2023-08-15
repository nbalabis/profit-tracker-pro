import { formatPrice } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";

interface SalesGraphTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

const SalesGraphTooltip: React.FC<SalesGraphTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    // Get data from the payload
    const { sales } = payload[0].payload;

    // If there are no sales, don't show the tooltip
    if (sales === 0) return null;

    return (
      <Card>
        <CardHeader className="p-1.5 text-sm font-bold tracking-tighter">
          {formatPrice(sales)}
        </CardHeader>
      </Card>
    );
  }

  return null;
};

export default SalesGraphTooltip;
