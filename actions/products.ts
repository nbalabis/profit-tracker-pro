import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { Product } from "@prisma/client";
import { getStoreById } from "./stores";

// Get all products from a store
export async function getAllProducts(storeId: string): Promise<Product[]> {
  try {
    // Check if the user is logged in
    const { userId } = auth();
    if (!userId) return [];

    // Get the store by ID to verify that the user owns it
    const store = await getStoreById(storeId);
    if (!store) return [];

    // Get all products from the store
    const products = await prismadb.product.findMany({ where: { storeId } });
    return products;
  } catch (error) {
    console.log("[CREATE_STORE_ERROR]", error);
  }
  return [];
}
