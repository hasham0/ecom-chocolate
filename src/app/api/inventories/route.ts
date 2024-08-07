import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/db";
import {
  inventories,
  inventoriesInsertTS,
  warehouses,
  products,
} from "@/lib/database/schemas/schema";
import inventoriesSchema from "@/lib/validators/inventoriesSchema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  // ! check auth

  let allInventoryData;

  // fetch inventery data from db
  try {
    allInventoryData = await db
      .select({
        id: inventories.id,
        sku: inventories.sku,
        warehouse: warehouses.name,
        product: products.name,
      })
      .from(inventories)
      .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
      .leftJoin(products, eq(inventories.productId, products.id))
      .orderBy(desc(inventories.id));
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to fetch inventry data from db",
        error: error,
      },
      { status: 500 },
    );
  }

  // checking inventries data length
  if (!allInventoryData.length) {
    return NextResponse.json(
      {
        message: "inventry not found in db",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "OK",
      data: allInventoryData,
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  // ! check auth

  //   recieve and validate data
  const data: inventoriesInsertTS = await request.json();
  let validateData;
  try {
    validateData = inventoriesSchema.parse(data);
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to validate inventries data",
        error: error,
      },
      { status: 400 },
    );
  }

  //   insert data into db
  let inventoriesData: inventoriesInsertTS[];
  try {
    inventoriesData = await db
      .insert(inventories)
      .values(validateData)
      .returning()
      .execute();
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to insert inventries data in db",
        error: error,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "OK",
      data: inventoriesData,
    },
    { status: 200 },
  );
}
