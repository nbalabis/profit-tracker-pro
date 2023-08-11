"use client";

import { useState } from "react";
import { Product } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "./ui/tabs";
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
          label="Last Week"
        />
        <SelectOption
          value={"month"}
          action={setTimeFrame}
          current={timeFrame}
          label="Last Month"
        />
        <SelectOption
          value={"year"}
          action={setTimeFrame}
          current={timeFrame}
          label="Last Year"
        />
      </Selector>
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
          <Card className="h-32 grow">StatCard 1</Card>
          <Card className="h-32 grow">StatCard 2</Card>
          <Card className="h-32 grow">StatCard 3</Card>
          <Card className="h-32 grow">StatCard 4</Card>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
          <Card className="h-96 grow">Sales Graph</Card>
          <Card className="h-96 md:w-96">Category Chart</Card>
        </div>
        <div>
          <Card className="h-96">Transactions Table</Card>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
