"use client";

import { useEffect, useState } from "react";

import AddProductModal from "./add-product-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <AddProductModal />
    </>
  );
};
