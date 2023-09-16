import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddExpenseModal } from "@/hooks/use-add-expense-modal";

const AddExpenseModal = () => {
  const modal = useAddExpenseModal();

  return (
    <Dialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
        // form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Expense</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
