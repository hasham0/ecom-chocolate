import { db } from "@/lib/database/db";
import {
  deliveryPersons,
  deliveryPersonsInsertTS,
  deliveryPersonsSelectTS,
  warehouses,
} from "@/lib/database/schemas/schema";
import deliveryPersonSchema from "@/lib/validators/deliveryPersonsSchema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // ! check auth

  // fetch delivery person data from db
  let allDeliveryPerson;
  try {
    allDeliveryPerson = await db
      .select({
        id: deliveryPersons.id,
        name: deliveryPersons.name,
        phone: deliveryPersons.phone,
        warehouses: warehouses.name,
      })
      .from(deliveryPersons)
      .leftJoin(warehouses, eq(deliveryPersons.warehousesId, warehouses.id))
      .orderBy(desc(deliveryPersons.id));
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to fetch delivery person data from db",
        error: error,
      },
      { status: 500 },
    );
  }

  // checking delivery person data length
  if (!allDeliveryPerson.length) {
    return NextResponse.json(
      {
        message: " delivery person data not found in db",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "OK",
      data: allDeliveryPerson,
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  //! check authwarehouse
  // recive and validate delivery peroson data
  const data = await request.json();

  let validateData: deliveryPersonsInsertTS;
  try {
    validateData = deliveryPersonSchema.parse(data);
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to validate delivery person data",
        error: error,
      },
      { status: 400 },
    );
  }

  // inser data in database
  let deliveryPersonData: deliveryPersonsInsertTS[];
  try {
    deliveryPersonData = await db
      .insert(deliveryPersons)
      .values(validateData)
      .returning()
      .execute();
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to insert delivery person data in db",
        error: error,
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "OK",
      data: deliveryPersonData,
    },
    { status: 200 },
  );
}
