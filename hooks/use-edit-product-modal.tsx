import { Product } from "@prisma/client";
import { create } from "zustand";

interface useEditProductModalStore {
  isOpen: boolean;
  onOpen: (product: Product, isSold: boolean) => void;
  onClose: () => void;
  isSold: boolean;
  product: Product | null;
}

export const useEditProductModal = create<useEditProductModalStore>((set) => ({
  isOpen: false,
  onOpen: (product: Product, isSold: boolean) => {
    set({ isOpen: true });
    set({ isSold: isSold });
    set({ product: product });
  },
  onClose: () => set({ isOpen: false }),
  isSold: false,
  product: null,
}));
