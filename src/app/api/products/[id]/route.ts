import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/db";
import { products, productsSelectTS } from "@/lib/database/schemas/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  let getProductByID: productsSelectTS[];

  // fetch product data from db by Id
  try {
    getProductByID = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)))
      .limit(1);
  } catch (error) {
    const cause = (error as { detail: string }).detail;

    return NextResponse.json(
      {
        message: cause || "failed to get product data by id from db",
        error: error,
      },
      { status: 500 },
    );
  }

  // checking product data length
  if (!getProductByID.length) {
    return NextResponse.json(
      {
        message: "product not found in db",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "Product Fetch Succesfully",
      data: getProductByID[0],
    },
    { status: 200 },
  );
}
