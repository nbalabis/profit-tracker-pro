import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import {
  checkRemainingTrialProducts,
  checkSubscription,
} from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, storeId, source, sourceDate, sourcePrice, category } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !source || !sourceDate || !sourcePrice || !category) {
      return new NextResponse("Missing required values", { status: 400 });
    }

    const freeTrial = await checkRemainingTrialProducts();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 },
      );
    }

    const response = await prismadb.product.create({
      data: {
        name,
        store: { connect: { id: storeId, ownerId: userId } },
        source,
        sourceDate,
        sourcePrice,
        category,
      },
    });

    if (freeTrial) {
      await prismadb.userTrial.update({
        where: { userId },
        data: { productsRemaining: { decrement: 1 } },
      });
    }

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("[CREATE_STORE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
