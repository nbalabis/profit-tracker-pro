"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Expense } from "@prisma/client";
import { formatDate, formatPrice } from "@/lib/utils";
// TODO: Add ExpenseTableRowActions
// import ProductTableRowActions from "./product-table-row-actions";
import SortedColumnHeader from "./sorted-column-header";

const title: ColumnDef<Expense> = {
  id: "name",
  accessorKey: "title",
  header: ({ column }) => (
    <div>
      <SortedColumnHeader column={column} title="Expense" />
    </div>
  ),
  cell: ({ row }) => <p className="truncate">{row.original.title}</p>,
};

const price: ColumnDef<Expense> = {
  accessorKey: "price",
  header: ({ column }) => (
    <div className="text-right">
      <SortedColumnHeader column={column} title="Price" />
    </div>
  ),
  cell: ({ row }) => {
    const price = parseFloat(row.getValue("price"));
    const formatted = formatPrice(price);

    return <div className="text-right font-medium">{formatted}</div>;
  },
};

const date: ColumnDef<Expense> = {
  accessorKey: "date",
  header: ({ column }) => (
    <div className="text-center">
      <SortedColumnHeader column={column} title="Purchase Date" initialSort />
    </div>
  ),
  cell: ({ row }) => {
    const date = formatDate(row.getValue("date"));
    return <div className="text-center">{date}</div>;
  },
};

export const expenseColumns: ColumnDef<Expense>[] = [title, date, price];
