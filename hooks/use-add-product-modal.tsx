import { create } from "zustand";

interface useAddProductModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddProductModal = create<useAddProductModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
