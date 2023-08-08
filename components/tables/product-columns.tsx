"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Product } from "@prisma/client";
import { formatDate, formatPrice } from "@/lib/utils";
import ProductTableRowActions from "./product-table-row-actions";
import SortedColumnHeader from "./sorted-column-header";
import { sources } from "@/config/selectOptions";

const title: ColumnDef<Product> = {
  accessorKey: "title",
  header: "Item Name",
  cell: ({ row }) => (
    <p className="max-w-[200px] truncate">{row.original.name}</p>
  ),
};

const sourcePrice: ColumnDef<Product> = {
  accessorKey: "sourcePrice",
  header: ({ column }) => (
    <div className="text-right">
      <SortedColumnHeader column={column} title="Purchase Price" />
    </div>
  ),
  cell: ({ row }) => {
    const sourcePrice = parseFloat(row.getValue("sourcePrice"));
    const formatted = formatPrice(sourcePrice);

    return <div className="text-right font-medium">{formatted}</div>;
  },
};

const source: ColumnDef<Product> = {
  accessorKey: "source",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Sourced From" />
    </div>
  ),
  cell: ({ row }) => {
    const source = sources.find((s) => s.value === row.getValue("source"));
    return <div className="text-center">{source?.title}</div>;
  },
};

const sourceDate: ColumnDef<Product> = {
  accessorKey: "sourceDate",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Purchase Date" />
    </div>
  ),
  cell: ({ row }) => {
    const date = formatDate(row.getValue("sourceDate"));
    return <div className="text-center">{date}</div>;
  },
};

const status: ColumnDef<Product> = {
  id: "status",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Status" />
    </div>
  ),
  cell: ({ row }) => {
    return <div className="text-center text-gray-400">Unlisted</div>;
  },
};

const salePrice: ColumnDef<Product> = {
  accessorKey: "sale_price",
  header: ({ column }) => (
    <div className="text-right">
      <SortedColumnHeader column={column} title="Sale Price" />
    </div>
  ),
  cell: ({ row }) => {
    if (!row.getValue("sale_price"))
      return <div className="text-right text-gray-400">Unsold</div>;
    const salePrice = parseFloat(row.getValue("sale_price"));
    const formatted = formatPrice(salePrice);

    return <div className="text-right font-medium">{formatted}</div>;
  },
};

const saleDate: ColumnDef<Product> = {
  accessorKey: "saleDate",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Sale Date" />
    </div>
  ),
  cell: ({ row }) => {
    if (!row.getValue("saleDate"))
      return <div className="text-center text-gray-400">-</div>;
    const date = formatDate(row.getValue("saleDate"));
    return <div className="text-center">{date}</div>;
  },
};

const saleChannel: ColumnDef<Product> = {
  accessorKey: "sale_channel",
  header: ({column}) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Sold On" />
    </div>
  ),
  cell: ({ row }) => {
    if (!row.getValue("sale_channel"))
      return <div className="text-center text-gray-400">-</div>;
    return <div className="text-center">{row.getValue("sale_channel")}</div>;
  },
};

const fees: ColumnDef<Product> = {
  id: "fees",
  header: ({ column }) => (
    <div className="text-right">
      <SortedColumnHeader column={column} title="Fees" />
    </div>
  ),
  cell: ({ row }) => {
    if (!row.getValue("sale_price"))
      return <div className="mr-4 text-right text-gray-400">-</div>;

    const platformFees = row.original.platformFee || 0;
    const shippingFees = row.original.shippingFee || 0;
    const taxes = row.original.tax || 0;
    const miscFees = row.original.miscFee || 0;
    const formatted = formatPrice(
      platformFees + shippingFees + taxes + miscFees,
    );

    return <div className="text-right font-medium">{formatted}</div>;
  },
};

const profit: ColumnDef<Product> = {
  id: "profit",
  accessorFn: (row) => {
    if (!row.salePrice) return 0;
    const purchasePrice = row.sourcePrice || 0;
    const salePrice = row.salePrice || 0;
    const platformFees = row.platformFee || 0;
    const shippingFees = row.shippingFee || 0;
    const taxes = row.tax || 0;
    const miscFees = row.miscFee || 0;
    const totalFees = platformFees + shippingFees + taxes + miscFees;
    const profit = salePrice - purchasePrice - totalFees;
    return profit;
  },
  header: ({ column }) => (
    <div className="text-right">
      <SortedColumnHeader column={column} title="Profit" />
    </div>
  ),
  cell: ({ row }) => {
    const profit: number = row.getValue("profit");
    const formatted = formatPrice(profit);

    if (profit === 0)
      return <div className="mr-4 text-right text-gray-400">-</div>;

    return (
      <div
        className={`text-right font-medium ${
          profit >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {formatted}
      </div>
    );
  },
};

const daysHeld: ColumnDef<Product> = {
  id: "daysHeld",
  accessorFn: (row) => {
    let saleDate = new Date();
    if (row.saleDate) {
      saleDate = new Date(row.saleDate);
    }
    const sourceDate = new Date(row.sourceDate);
    const daysHeld = Math.floor(
      (saleDate.getTime() - sourceDate.getTime()) / (1000 * 3600 * 24),
    );
    return daysHeld;
  },
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Days Held" />
    </div>
  ),
  cell: ({ row }) => {
    return <div className="text-center">{row.getValue("daysHeld")}</div>;
  },
};

const actions: ColumnDef<Product> = {
  id: "actions",
  cell: ({ row }) => <ProductTableRowActions row={row} />,
};

export const allProductsColumns: ColumnDef<Product>[] = [
  title,
  sourcePrice,
  sourceDate,
  source,
  status,
  salePrice,
  saleDate,
  saleChannel,
  fees,
  profit,
  daysHeld,
  actions,
];

export const overviewProductsColumns: ColumnDef<Product>[] = [
  title,
  sourcePrice,
  salePrice,
  profit,
  daysHeld,
  actions,
];
