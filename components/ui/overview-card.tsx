import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";

interface OverviewCardProps {
  title: string;
  Icon: LucideIcon;
  value: string;
  change: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  Icon,
  value,
  change,
}) => {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <>
          <div className="text-3xl font-bold">{value}</div>
          <p className="pt-1 text-sm text-muted-foreground">{change}</p>
        </>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
