import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/db";
import {
  inventries,
  inventriesInsertTS,
  inventriesSelectTS,
  products,
  warehouses,
} from "@/lib/database/schemas/schema";
import inventriesSchema from "@/lib/validators/inventriesSchema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  // ! check auth

  let allInventeryData;

  // fetch inventery data from db
  try {
    allInventeryData = await db
      .select({
        id: inventries.id,
        sku: inventries.sku,
        warehouse: warehouses.name,
        product: products.name,
      })
      .from(inventries)
      .leftJoin(warehouses, eq(inventries.warehouseId, warehouses.id))
      .leftJoin(products, eq(inventries.productId, products.id))
      .orderBy(desc(inventries.id));
  } catch (error) {
    return NextResponse.json(
      {
        flag: false,
        messgae: "failed to fetch inventry data from db",
        error: error,
      },
      { status: 500 }
    );
  }

  // checking inventries data length
  if (!allInventeryData.length) {
    return NextResponse.json(
      {
        flag: false,
        message: "inventry not found in db",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      flag: true,
      message: "OK",
      data: allInventeryData,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  // ! check auth

  //   recieve and validate data
  const data: inventriesInsertTS = await request.json();
  let validateData;
  try {
    validateData = inventriesSchema.parse(data);
  } catch (error) {
    return NextResponse.json(
      {
        flag: false,
        messgae: "failed to validate inventries data",
        error: error,
      },
      { status: 400 }
    );
  }

  //   insert data into db
  let inventriesData: inventriesInsertTS[];
  try {
    inventriesData = await db
      .insert(inventries)
      .values(validateData)
      .returning()
      .execute();
  } catch (error) {
    return NextResponse.json(
      {
        flag: false,
        messgae: "failed to insert inventries data in db",
        error: error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      flag: true,
      message: "OK",
      data: inventriesData,
    },
    { status: 200 }
  );
}
