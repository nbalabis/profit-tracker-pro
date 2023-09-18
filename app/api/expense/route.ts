import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

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
