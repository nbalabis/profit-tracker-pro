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

/* GET AN EXPENSE BY ID */
export async function getExpenseById(
  expenseId: string,
): Promise<Expense | null> {
  try {
    // Check if the user is logged in
    const { userId } = auth();
    if (!userId) return null;

    // Get the expense by ID
    const expense = await prismadb.expense.findUnique({
      where: { id: expenseId },
    });
    if (!expense) return null;

    // Check if the user owns the store containing the expense
    const store = await getStoreById(expense.storeId);
    if (!store) return null;

    return expense;
  } catch (error) {
    console.log("[GET_EXPENSE_ERROR]", error);
  }
  return null;
}
