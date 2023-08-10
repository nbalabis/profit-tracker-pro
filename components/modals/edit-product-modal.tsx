"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditProductModal } from "@/hooks/use-edit-product-modal";
import EditUnsoldProductForm from "@/components/forms/edit-unsold-product-form";
import EditSoldProductForm from "../forms/edit-sold-product-form";

const SoldProductModal = () => {
  const modal = useEditProductModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {modal.isSold ? (
          <EditSoldProductForm product={modal.product} />
        ) : (
          <EditUnsoldProductForm product={modal.product} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SoldProductModal;
