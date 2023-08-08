"use client";

import { Row } from "@tanstack/react-table";
import type { Product } from "@prisma/client";
import { useParams } from "next/navigation";
import { DollarSign, MoreHorizontal, Pen, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSoldProductModal } from "@/hooks/use-sold-product-modal";

interface ProducTableRowActionsProps {
  row: Row<Product>;
}

const ProducTableRowActions: React.FC<ProducTableRowActionsProps> = ({
  row,
}) => {
  const soldProductModal = useSoldProductModal();
  const params = useParams();

  /* DELETE HANDLER */
  const handleProductDelete = async () => {};

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!row.original.saleDate && (
            <>
              <DropdownMenuItem
                onClick={() =>
                  soldProductModal.onOpen(
                    params.storeId as string,
                    row.original.id,
                  )
                }
              >
                <DollarSign className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Mark as sold
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => {}}>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleProductDelete}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProducTableRowActions;
