"use client";

import { useState } from "react";
import { Expense, Product } from "@prisma/client";

import ROICard from "@/components/cards/roi-card";
import SalesCard from "@/components/cards/sales-card";
import ProfitCard from "@/components/cards/profit-card";
import SalesGraph from "@/components/graphs/sales-graph";
import RevenueCard from "@/components/cards/revenue-card";
import CategoryGraph from "@/components/graphs/category-graph";
import { SelectOption, Selector } from "@/components/ui/selector";
import TransactionsTable from "@/components/tables/transactions-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardViewProps {
  products: Product[];
  expenses: Expense[];
}

const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  expenses,
}) => {
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
          <ProfitCard
            products={products}
            expenses={expenses}
            timeFrame={timeFrame}
          />
          <ROICard
            products={products}
            expenses={expenses}
            timeFrame={timeFrame}
          />
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
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Sales by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="aspect-square h-full lg:aspect-auto">
              <CategoryGraph products={products} timeFrame={timeFrame} />
            </CardContent>
          </Card>
        </div>
        <div>
          <div>
            <CardHeader className="px-3">
              <CardTitle className="text-md font-medium">
                Transactions
              </CardTitle>
              <CardDescription>
                All products bought/sold in the last {timeFrame}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <TransactionsTable products={products} timeFrame={timeFrame} />
            </CardContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
