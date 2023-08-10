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

/* GET A PRODUCT BY ID */
export async function getProductById(
  productId: string,
): Promise<Product | null> {
  try {
    // Check if the user is logged in
    const { userId } = auth();
    if (!userId) return null;

    // Get the product by ID
    const product = await prismadb.product.findUnique({
      where: { id: productId },
    });
    if (!product) return null;

    // Check if the user owns the store containing the product
    const store = await getStoreById(product.storeId);
    if (!store) return null;

    return product;
  } catch (error) {
    console.log("[GET_PRODUCT_ERROR]", error);
  }
  return null;
}
