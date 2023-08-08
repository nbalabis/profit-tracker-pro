"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { DollarSign, MoreHorizontal, Pen, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

// import SoldProductDialog from "../SoldProductDialog";
// import EditProductDialog from "../EditProductDialog";

interface ProducTableRowActionsProps {
  row: Row<Product>;
}

const ProducTableRowActions: React.FC<ProducTableRowActionsProps> = ({
  row,
}) => {
  const [showSoldDialog, setShowSoldDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  //   const { supabaseClient } = useSessionContext();
  const { toast } = useToast();
  const router = useRouter();

  // Delete product from supabase
  const handleProductDelete = async () => {
    // Delete item from supabase
    // const { error } = await supabaseClient
    //   .from("inventory_items")
    //   .delete()
    //   .match({
    //     id: row.original.id,
    //   });
    // if (error) {
    //   toast({ title: "Error", description: error.message });
    // } else {
    //   toast({ title: "Success", description: "Item Deleted" });
    // }
    // router.refresh();
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
          {!row.original.saleDate && (
            <>
              <DropdownMenuItem onClick={() => setShowSoldDialog(true)}>
                <DollarSign className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Mark as sold
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleProductDelete}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <SoldProductDialog
        open={showSoldDialog}
        setOpen={setShowSoldDialog}
        productId={row.original.id}
      />
      <EditProductDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        product={row.original}
        sold={row.original.sold}
      /> */}
    </>
  );
};

export default ProducTableRowActions;
