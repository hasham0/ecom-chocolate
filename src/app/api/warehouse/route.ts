import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/db";
import {
  warehouses,
  warehousesInsertTS,
  warehousesSelectTS,
} from "@/lib/database/schemas/schema";
import warehousesSchema from "@/lib/validators/warehouseSchema";

export async function GET(request: NextRequest) {
  // ! check auth

  let allWarehouseData: warehousesSelectTS[];

  // fetch warehouse data from db
  try {
    allWarehouseData = await db.select().from(warehouses);
  } catch (error) {
    const cause = (error as { detail: string }).detail;
    return NextResponse.json(
      {
        messgae: cause || "failed to fetch warehouse data from db",
        error: error,
      },
      { status: 500 },
    );
  }

  // checking warehouses data length
  if (!allWarehouseData.length) {
    return NextResponse.json(
      {
        message: "warehouse not found in db",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      data: allWarehouseData,
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  // ! check auth

  //   recieve and validate data
  const data: warehousesInsertTS = await request.json();
  let validateData;
  try {
    validateData = warehousesSchema.parse(data);
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to validate warehouse data",
        error: error,
      },
      { status: 400 },
    );
  }

  //   insert data into db
  let wareahouseData: warehousesInsertTS[];
  try {
    wareahouseData = await db
      .insert(warehouses)
      .values(validateData)
      .returning()
      .execute();
  } catch (error) {
    const cause = (error as { detail: string }).detail;
    return NextResponse.json(
      {
        messgae: cause || "failed to insert warehouse data in db",
        error: error,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "New Warehouse Added Successfully",
      data: wareahouseData,
    },
    { status: 200 },
  );
}
