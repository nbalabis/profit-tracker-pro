"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditExpenseModal } from "@/hooks/use-edit-expense-modal";
import EditExpenseForm from "@/components/forms/edit-expense-form";

const SoldProductModal = () => {
  const modal = useEditExpenseModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <EditExpenseForm expense={modal.expense} />
      </DialogContent>
    </Dialog>
  );
};

export default SoldProductModal;
