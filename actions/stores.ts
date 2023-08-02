import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { Store } from "@prisma/client";

export async function getAllStores(): Promise<Store[]> {
  try {
    const { userId } = auth();

    if (!userId) {
      return [];
    }

    const stores = await prismadb.store.findMany({
      where: { ownerId: userId },
    });
    return stores;
  } catch (error) {
    console.log("[CREATE_STORE_ERROR]", error);
  }
  return [];
}

export async function getStoreById(id: string): Promise<Store | null> {
  try {
    const { userId } = auth();

    if (!userId) {
      return null;
    }

    const store = await prismadb.store.findUnique({
      where: { id, ownerId: userId },
    });
    return store;
  } catch (error) {
    console.log("[GET_STORE_BY_ID_ERROR]", error);
  }
  return null;
}
