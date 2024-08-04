import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/db";
import {
  warehouses,
  warehousesInsertTS,
  warehousesSelectTS,
} from "@/lib/database/schemas/schema";
import warehousesSchema from "@/lib/validators/warehouseSchema";

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
        flag: false,
        messgae: "failed to validate warehouse data",
        error: error,
      },
      { status: 400 }
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
    return NextResponse.json(
      {
        flag: false,
        messgae: "failed to insert warehouse data in db",
        error: error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      flag: true,
      message: "OK",
      data: wareahouseData,
    },
    { status: 200 }
  );
}
