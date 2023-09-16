"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAddExpenseModal } from "@/hooks/use-add-expense-modal";

const TempPage = () => {
  const addExpenseModal = useAddExpenseModal();

  return (
    <div>
      <Button
        size="icon"
        onClick={() => addExpenseModal.onOpen()}
        className="aspect-square"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TempPage;
