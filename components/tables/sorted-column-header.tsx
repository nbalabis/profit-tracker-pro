import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

import type { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface SortedColumnHeaderProps {
  column: Column<Product, unknown>;
  title: string;
}

const SortedColumnHeader: React.FC<SortedColumnHeaderProps> = ({
  column,
  title,
}) => {
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
