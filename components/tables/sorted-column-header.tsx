"use client";

import { useEffect } from "react";
import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SortedColumnHeaderProps {
  column: Column<any>;
  title: string;
  initialSort?: boolean;
}

const SortedColumnHeader: React.FC<SortedColumnHeaderProps> = ({
  column,
  title,
  initialSort,
}) => {
  // Set initial sort
  useEffect(() => {
    if (initialSort) {
      column.toggleSorting();
      console.log("initial sort");
    }
  }, [initialSort, column]);

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="mx-0"
    >
      {title}
      {column.getIsSorted() === "desc" ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

export default SortedColumnHeader;
