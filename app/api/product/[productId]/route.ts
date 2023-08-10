import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getProductById } from "@/actions/products";

export async function DELETE(
  request: Request,
  context: { params: { productId: string } },
) {
  try {
    const { productId } = context.params;

    // Get the product to delete
    // Also checks if the user is logged in and owns the store containing the product
    const product = await getProductById(productId);
    if (!product) return new NextResponse("Product Not Found", { status: 404 });

    // Delete the product from the database
    await prismadb.product.delete({ where: { id: productId } });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.log("[DELETE_PRODUCT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
