"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAddProductModal } from "@/hooks/use-add-product-modal";

const ProductsPage = () => {
  const addProductModal = useAddProductModal();

  return (
    <div>
      <Button size="icon" onClick={() => addProductModal.onOpen()}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductsPage;
