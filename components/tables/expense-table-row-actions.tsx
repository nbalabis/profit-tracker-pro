"use client";

import { Row } from "@tanstack/react-table";
import type { Expense } from "@prisma/client";
import { DollarSign, MoreHorizontal, Pen, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSoldProductModal } from "@/hooks/use-sold-product-modal";
import { useEditProductModal } from "@/hooks/use-edit-product-modal";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface ExpenseTableRowActionsProps {
  row: Row<Expense>;
}

const ExpenseTableRowActions: React.FC<ExpenseTableRowActionsProps> = ({
  row,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const soldProductModal = useSoldProductModal();
  const editProductModal = useEditProductModal();

  /* DELETE HANDLER */
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the API
      await axios.delete(`/api/expense/${row.original.id}`);

      // Refresh the page
      router.refresh();
      toast({
        title: "Success!",
        description: "Your expense has been deleted.",
      });
    } catch (error: any) {
      // Alert any errors (unlimited 'edit' for all users - no pro modal)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data || "Please try again later.",
      });
    }
  };

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
          <DropdownMenuItem onClick={() => editExpenseModal.onOpen()}>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ExpenseTableRowActions;
