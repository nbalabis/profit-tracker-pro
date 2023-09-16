"use client";

import { useEffect, useState } from "react";

import ProModal from "./pro-modal";
import AddProductModal from "./add-product-modal";
import AddExpenseModal from "./add-expense-modal";
import EditProductModal from "./edit-product-modal";
import SoldPorductModal from "./sold-product-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <ProModal />
      <AddProductModal />
      <EditProductModal />
      <SoldPorductModal />
      <AddExpenseModal />
    </>
  );
};
