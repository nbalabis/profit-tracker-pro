import { Product } from "@prisma/client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { filterProductsByTimeFrame } from "@/lib/utils";
import { categories } from "@/config/selectOptions";
import { useState } from "react";

interface CategoryGraphProps {
  products: Product[];
  timeFrame: string;
}

const CategoryGraph: React.FC<CategoryGraphProps> = ({
  products,
  timeFrame,
}) => {
  const [focusBar, setFocusBar]: any = useState(null);

  let data: { label: string; value: string; quantity: number }[] = [];

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
      data[index].quantity++;
    } else {
      data.push({
        label: category.title,
        value: product.category,
        quantity: 1,
      });
    }
  });

  return (
    <ResponsiveContainer width="100%">
      <PieChart>
        <Pie
          dataKey="quantity"
          outerRadius="100%"
          innerRadius="70%"
          data={data}
        >
          {data.map((entry: any, index: number) => (
            <Cell
              key={index}
              fill={focusBar === index ? "#3361EB" : "rgba(51, 97, 235, 0.2)"}
              onMouseEnter={() => setFocusBar(index)}
              onMouseLeave={() => setFocusBar(null)}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryGraph;
