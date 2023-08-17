"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Transaction } from "./transactions-table";
import { categories } from "@/config/selectOptions";
import { formatDate, formatPrice } from "@/lib/utils";
import SortedColumnHeader from "./sorted-column-header";

/* Item name column */
const name: ColumnDef<Transaction> = {
  accessorKey: "name",
  header: ({ column }) => (
    <div className="">
      <SortedColumnHeader column={column} title="Item Name" />
    </div>
  ),
  cell: ({ row }) => {
    // Get category Icon
    const category = categories.find(
      (category) => category.value === row.original.categoryValue,
    );
    const Icon = category?.icon;

    return (
      <div className="flex flex-row items-center">
        {Icon && <Icon className="mr-3 h-5 w-5" />}
        <p className="truncate">{row.original.name}</p>
      </div>
    );
  },
};

/* Action column */
const action: ColumnDef<Transaction> = {
  accessorKey: "action",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Action" />
    </div>
  ),
  cell: ({ row }) => <p className="text-center">{row.original.action}</p>,
};

/* Action date column */
const actionDate: ColumnDef<Transaction> = {
  accessorKey: "actionDate",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Date" initialSort />
    </div>
  ),
  cell: ({ row }) => {
    const date = formatDate(row.original.actionDate);
    return <div className="text-center">{date}</div>;
  },
};

/* Price column */
const price: ColumnDef<Transaction> = {
  accessorKey: "price",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Price/Cost" />
    </div>
  ),
  cell: ({ row }) => {
    const formatted = formatPrice(row.original.price);
    return (
      <div
        className={`text-center font-medium ${
          row.original.action === "Sold" ? "text-green-500" : "text-red-500"
        }`}
      >
        {formatted}
      </div>
    );
  },
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  name,
  action,
  actionDate,
  price,
];
