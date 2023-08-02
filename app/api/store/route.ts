import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkFreeTrial, checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Missing required values", { status: 400 });
    }

    const freeTrial = checkFreeTrial();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 },
      );
    }

    const duplicateName = await prismadb.store.findFirst({
      where: { ownerId: userId, name },
    });

    if (duplicateName) {
      return new NextResponse("Store name already exists", { status: 400 });
    }

    const response = await prismadb.store.create({
      data: { ownerId: userId, name },
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("[CREATE_STORE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
