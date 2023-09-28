import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getStoreById } from "@/actions/stores";

export async function POST(req: Request) {
  try {
    // Verify that the user is logged in
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if required values are present (price can be 0)
    const body = await req.json();
    const { title, date, price, storeId } = body;
    if (!title || !date || !storeId) {
      return new NextResponse("Missing required values", { status: 400 });
    }

    // ** DOES NOT NEED TO BE SUBSCRIBED **

    // Create the expense
    const response = await prismadb.expense.create({
      data: {
        title,
        date,
        price,
        store: { connect: { id: storeId, ownerId: userId } },
      },
    });

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("[CREATE_EXPENSE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/* EDIT AN EXPENSE */
export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { storeId, expenseId, title, price, date } = body;

    // Check if user is logged in and owns the store containing the expense
    const store = await getStoreById(storeId);
    if (!userId || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if required values are present (price can be 0)
    if (!title || !date || price === undefined) {
      return new NextResponse("Missing required values", { status: 400 });
    }

    // User will be able to edit any expense - regardless of plan tier

    // Update the expense in the database and set status to sold
    const response = await prismadb.expense.update({
      where: { id: expenseId },
      data: {
        title,
        date,
        price,
      },
    });

    // Return the updated expense
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    // Throw an error if something goes wrong
    console.log("[UPDATE_EXPENSE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
