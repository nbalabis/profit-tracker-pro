import { Expense } from "@prisma/client";
import { create } from "zustand";

interface useEditExpenseModalStore {
  isOpen: boolean;
  onOpen: (expense: Expense) => void;
  onClose: () => void;
  expense: Expense | null;
}

export const useEditExpenseModal = create<useEditExpenseModalStore>((set) => ({
  isOpen: false,
  onOpen: (expense: Expense) => {
    set({ isOpen: true });
    set({ expense: expense });
  },
  onClose: () => set({ isOpen: false }),
  isSold: false,
  expense: null,
}));
