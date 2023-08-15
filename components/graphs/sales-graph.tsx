"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { Product } from "@prisma/client";

import SalesGraphTooltip from "./sales-graph-tooltip";
import { filterProductsByTimeFrame } from "@/lib/utils";

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface SalesGraphProps {
  products: Product[];
  timeFrame: string;
}

const SalesGraph: React.FC<SalesGraphProps> = ({ products, timeFrame }) => {
  const [barGraphData, setBarGraphData]: any = useState({});
  const [focusBar, setFocusBar]: any = useState(null);

  // Initialize data for graph
  let data: any = [];

  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  const currentDate = new Date(endDate);

  /* Fill data array with date ranges */
  switch (timeFrame) {
    case "week":
      currentDate.setDate(endDate.getDate() - 6);

      while (currentDate <= endDate) {
        const rangeStart = new Date(currentDate);
        const rangeEnd = new Date(currentDate);
        rangeEnd.setDate(rangeStart.getDate() + 1);

        data.push({
          label: weekday[currentDate.getDay()],
          sales: 0,
          rangeStart,
          rangeEnd,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      break;
    case "month":
      currentDate.setMonth(endDate.getMonth() - 1);
      currentDate.setDate(endDate.getDate() + 1);

      while (currentDate <= endDate) {
        const label = currentDate.toLocaleDateString();
        const rangeStart = new Date(currentDate);
        const rangeEnd = new Date(currentDate);
        rangeEnd.setDate(rangeStart.getDate() + 1);

        data.push({
          label: label.substring(0, label.length - 5),
          sales: 0,
          rangeStart,
          rangeEnd,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      break;
    case "year":
      currentDate.setFullYear(endDate.getFullYear() - 1);
      currentDate.setMonth(endDate.getMonth() + 1);
      currentDate.setDate(1);

      while (currentDate <= endDate) {
        const rangeStart = new Date(currentDate);
        const rangeEnd = new Date(currentDate);
        rangeEnd.setMonth(rangeStart.getMonth() + 1);

        data.push({
          label: month[currentDate.getMonth()],
          sales: 0,
          rangeStart,
          rangeEnd,
        });
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      break;
    default:
      throw new Error("Invalid time frame");
  }

  // Filter products sold in timeFrame
  const filteredProducts = filterProductsByTimeFrame(
    products,
    timeFrame,
    "saleDate",
  );

  // Calculate sales for each period
  filteredProducts.forEach((product) => {
    if (product.saleDate) {
      const saleDate = new Date(product.saleDate);
      const index = data.findIndex(
        (d: { rangeStart: Date; rangeEnd: Date }) => {
          return saleDate >= d.rangeStart && saleDate < d.rangeEnd;
        },
      );

      if (index !== -1) {
        data[index].sales += product.salePrice;
      }
    }
  });

  /* TODO: DOESNT SHOW ON SMALL SCREENS */

  return (
    <div className="h-full text-primary">
      <ResponsiveContainer width="100%">
        <BarChart
          data={data}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setFocusBar(state.activeTooltipIndex);
            } else {
              setFocusBar(null);
            }
          }}
        >
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            stroke="#64748b"
            fontSize={14}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            stroke="#64748b"
            fontSize={14}
          />
          <Bar
            dataKey="sales"
            radius={[4, 4, 4, 4]}
            onMouseEnter={(data) => setBarGraphData(data)}
          >
            {data.map((entry: any, index: number) => (
              <Cell
                key={index}
                fill={focusBar === index ? "#3361EB" : "rgba(51, 97, 235, 0.2)"}
              />
            ))}
          </Bar>
          <Tooltip
            cursor={false}
            position={{ x: barGraphData.x - 12, y: barGraphData.y - 50 }}
            allowEscapeViewBox={{ x: true, y: true }}
            content={<SalesGraphTooltip />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGraph;
