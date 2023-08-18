import { formatPrice } from "@/lib/utils";

interface CategoryGraphTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  sideLength: number;
}

const CategoryGraphTooltip: React.FC<CategoryGraphTooltipProps> = ({
  active,
  payload,
  sideLength,
}) => {
  if (active && payload && payload.length) {
    const { label, sales, Icon } = payload[0].payload;
    return (
      <div
        className="absolute flex flex-col items-center justify-center gap-3 text-center"
        style={{ width: `${sideLength}px`, height: `${sideLength}px` }}
      >
        <Icon className="h-10 w-10" />
        <div className="text-2xl font-semibold">{formatPrice(sales)}</div>
        <div className="text-lg">{label}</div>
      </div>
    );
  }

  return null;
};

export default CategoryGraphTooltip;
