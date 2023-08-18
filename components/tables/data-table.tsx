"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Store } from "@prisma/client";
import { useEffect } from "react";
import { Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./data-table-pagination";
import { useAddProductModal } from "@/hooks/use-add-product-modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  withSearch?: boolean;
  addBtnForStore?: Store;
  pagination?: "simple" | "full";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  withSearch = false,
  addBtnForStore,
  pagination,
}: DataTableProps<TData, TValue>) {
  const addProductModal = useAddProductModal();

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination && getPaginationRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  useEffect(() => {
    if (pagination === "simple") {
      table.setPageSize(7);
    } else if (pagination === "full") {
      table.setPageSize(10);
    }
  }, [table, pagination]);

  return (
    <div>
      {withSearch && (
        <div className="flex items-center justify-between space-x-3 pb-3 md:pb-6 ">
          <Input
            placeholder="Search for an item..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
          {addBtnForStore && (
            <Button
              size="icon"
              onClick={() => addProductModal.onOpen()}
              className="aspect-square"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION CONTROLS */}
      {pagination && (
        <DataTablePagination table={table} pagination={pagination} />
      )}
    </div>
  );
}
