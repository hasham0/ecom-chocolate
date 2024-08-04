import { writeFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { db } from "@/lib/database/db";
import {
  products,
  productsSelectTS,
  productsInsertTS,
} from "@/lib/database/schemas/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  let getProductByID: productsSelectTS[];

  try {
    getProductByID = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)))
      .limit(1);
    if (!getProductByID.length) {
      return NextResponse.json(
        {
          flag: false,
          message: "product not found in db",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        flag: false,
        message: "failed to get product data by id from db",
        error: error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      flag: true,
      message: "OK",
      data: getProductByID[0],
    },
    { status: 200 }
  );
}
