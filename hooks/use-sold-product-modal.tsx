import { create } from "zustand";

interface useSoldProductModalStore {
  isOpen: boolean;
  onOpen: (storeId: string, productId: string) => void;
  onClose: () => void;
  productId: string;
  storeId: string;
}

export const useSoldProductModal = create<useSoldProductModalStore>((set) => ({
  isOpen: false,
  onOpen: (storeId, productId) => {
    set({ isOpen: true });
    set({ storeId: storeId });
    set({ productId: productId });
  },
  onClose: () => set({ isOpen: false }),
  productId: "",
  storeId: "",
}));
