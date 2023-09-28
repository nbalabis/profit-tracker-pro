import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getExpenseById } from "@/actions/expenses";

export async function DELETE(
  request: Request,
  context: { params: { expenseId: string } },
) {
  try {
    const { expenseId } = context.params;

    // Get the expense to delete
    // Also checks if the user is logged in and owns the store containing the expense
    const expense = await getExpenseById(expenseId);
    if (!expense) return new NextResponse("Expense Not Found", { status: 404 });

    // Delete the expense from the database
    await prismadb.expense.delete({ where: { id: expenseId } });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.log("[DELETE_EXPENSE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
