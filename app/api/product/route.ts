import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import {
  checkRemainingTrialProducts,
  checkSubscription,
} from "@/lib/subscription";
import { getStoreById } from "@/actions/stores";
import { convertLocalDateToUTC } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, storeId, source, sourceDate, sourcePrice, category } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if required values are present (prices can be 0)
    if (!name || !source || !sourceDate || !category) {
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

/* MARK PRODUCT AS SOLD */
export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      storeId,
      productId,
      salePrice,
      saleDate,
      saleChannel,
      platformFee,
      tax,
      shippingFee,
      miscFee,
    } = body;

    // Check if user is logged in and owns the store containing the product
    const store = await getStoreById(storeId);
    if (!userId || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if required values are present (prices can be 0)
    if (!productId || !saleDate || !saleChannel) {
      return new NextResponse("Missing required values", { status: 400 });
    }

    // User will be able to mark any product as sold - regardless of plan tier

    // Update the product in the database and set status to sold
    const response = await prismadb.product.update({
      where: { id: productId },
      data: {
        status: "SOLD",
        salePrice,
        saleDate: new Date(saleDate),
        saleChannel,
        platformFee,
        tax,
        shippingFee,
        miscFee,
      },
    });

    // Return the updated product
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    // Throw an error if something goes wrong
    console.log("[CREATE_STORE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/* EDIT A PRODUCT */
export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      storeId,
      productId,
      name,
      source,
      sourceDate,
      sourcePrice,
      category,
      salePrice,
      saleDate,
      saleChannel,
      platformFee,
      tax,
      shippingFee,
      miscFee,
    } = body;

    // Check if user is logged in and owns the store containing the product
    const store = await getStoreById(storeId);
    if (!userId || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if required values are present (sold prodct fields can be null)
    if (
      !productId ||
      !name ||
      !source ||
      !sourceDate ||
      !sourcePrice ||
      !category
    ) {
      return new NextResponse("Missing required values", { status: 400 });
    }

    // User will be able to edit any product - regardless of plan tier

    // Update the product in the database and set status to sold
    const response = await prismadb.product.update({
      where: { id: productId },
      data: {
        name,
        source,
        sourceDate,
        sourcePrice,
        category,
        salePrice,
        saleDate,
        saleChannel,
        platformFee,
        tax,
        shippingFee,
        miscFee,
      },
    });

    // Return the updated product
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    // Throw an error if something goes wrong
    console.log("[CREATE_STORE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
