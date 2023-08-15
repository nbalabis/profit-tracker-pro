"use client";

import { useState } from "react";
import { Product } from "@prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ROICard from "@/components/cards/roi-card";
import SalesCard from "@/components/cards/sales-card";
import ProfitCard from "@/components/cards/profit-card";
import SalesGraph from "@/components/graphs/sales-graph";
import RevenueCard from "@/components/cards/revenue-card";
import { SelectOption, Selector } from "@/components/ui/selector";

interface DashboardViewProps {
  products: Product[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ products }) => {
  const [timeFrame, setTimeFrame] = useState<string>("week");

  return (
    <>
      {/* Time frame selector */}
      <Selector>
        <SelectOption
          value={"week"}
          action={setTimeFrame}
          current={timeFrame}
          label="Week"
        />
        <SelectOption
          value={"month"}
          action={setTimeFrame}
          current={timeFrame}
          label="Month"
        />
        <SelectOption
          value={"year"}
          action={setTimeFrame}
          current={timeFrame}
          label="Year"
        />
      </Selector>
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2 xl:grid-cols-4">
          <RevenueCard products={products} timeFrame={timeFrame} />
          <ProfitCard products={products} timeFrame={timeFrame} />
          <ROICard products={products} timeFrame={timeFrame} />
          <SalesCard products={products} timeFrame={timeFrame} />
        </div>
        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-md font-medium">
                  Recent Sales
                </CardTitle>
              </CardHeader>
              <CardContent className="aspect-square h-full lg:aspect-auto">
                <SalesGraph products={products} timeFrame={timeFrame} />
              </CardContent>
            </Card>
          </div>
          <Card className="aspect-square">Category Chart</Card>
        </div>
        <div>
          <Card className="h-96">Transactions Table</Card>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
