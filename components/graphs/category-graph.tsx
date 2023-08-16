import { useState } from "react";
import { Product } from "@prisma/client";
import { LucideIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { categories } from "@/config/selectOptions";
import { filterProductsByTimeFrame } from "@/lib/utils";
import CategoryGraphTooltip from "./category-graph-tooltip";

interface CategoryGraphProps {
  products: Product[];
  timeFrame: string;
}

const CategoryGraph: React.FC<CategoryGraphProps> = ({
  products,
  timeFrame,
}) => {
  const [focusBar, setFocusBar]: any = useState(null);
  const [pieChartData, setPieChartData]: any = useState({
    cx: 0,
    cy: 0,
    innerRadius: 0,
  });
  const [stateChangesLeft, setStateChangesLeft] = useState(1);

  let data: {
    label: string;
    value: string;
    Icon: LucideIcon | string;
    sales: number;
  }[] = [];

  // Filter products sold in timeFrame
  const filteredProducts = filterProductsByTimeFrame(
    products,
    timeFrame,
    "saleDate",
  );

  // Fill data with categories and quantities
  filteredProducts.forEach((product) => {
    const category = categories.find((item) => item.value === product.category);
    if (!category) return;

    const index = data.findIndex((item) => item.value === product.category);

    if (index !== -1) {
      data[index].sales += product.salePrice || 0;
    } else {
      data.push({
        label: category.title,
        value: product.category,
        Icon: category.icon,
        sales: product.salePrice || 0,
      });
    }
  });

  /* This prevents state from being reset over and over */
  const helper = (data: any) => {
    if (stateChangesLeft > 0) {
      setPieChartData(data);
      setStateChangesLeft(stateChangesLeft - 1);
    }
  };

  return (
    <ResponsiveContainer width="100%">
      <PieChart>
        <Pie
          dataKey="sales"
          outerRadius="100%"
          innerRadius="70%"
          data={data}
          onMouseEnter={(data) => helper(data)}
        >
          {data.map((entry: any, index: number) => (
            <Cell
              key={index}
              fill={focusBar === index ? "#3361EB" : "rgba(51, 97, 235, 0.2)"}
              onMouseOver={(data) => setFocusBar(index)}
              onMouseLeave={() => setFocusBar(null)}
            />
          ))}
        </Pie>
        <Tooltip
          position={{
            x: pieChartData.cx - (Math.sqrt(2) * pieChartData.innerRadius) / 2,
            y: pieChartData.cy - (Math.sqrt(2) * pieChartData.innerRadius) / 2,
          }}
          content={
            <CategoryGraphTooltip
              sideLength={Math.sqrt(2) * pieChartData.innerRadius}
            />
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryGraph;
