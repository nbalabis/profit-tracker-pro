import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { getStoreById } from "./stores";
import { Expense } from "@prisma/client";

//Get all expenses from a store
export async function getAllExpenses(storeId: string): Promise<Expense[]> {
  try {
    // Check if the user is logged in
    const { userId } = auth();
    if (!userId) return [];

    // Get the store by ID to verify that the user owns it
    const store = await getStoreById(storeId);
    if (!store) return [];

    // Get all expenses from the store
    const expenses = await prismadb.expense.findMany({ where: { storeId } });
    return expenses;
  } catch (error) {
    console.log("[FIND_EXPENSES_ERROR]", error);
  }
  return [];
}
