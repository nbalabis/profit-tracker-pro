"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditProductModal } from "@/hooks/use-edit-product-modal";
import EditUnsoldProductForm from "@/components/forms/edit-unsold-product-form";

const SoldProductModal = () => {
  const modal = useEditProductModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {modal.isSold ? (
          <div>Sold Product</div>
        ) : (
          <EditUnsoldProductForm product={modal.product} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SoldProductModal;
