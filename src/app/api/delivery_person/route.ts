import { db } from "@/lib/database/db";
import {
  deliveryPersons,
  deliveryPersonsInsertTS,
  deliveryPersonsSelectTS,
} from "@/lib/database/schemas/schema";
import deliveryPersonSchema from "@/lib/validators/deliveryPersonSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //! check auth
  // recive and validate delivery peroson data
  const data = await request.json();
  let validateData;

  try {
    validateData = deliveryPersonSchema.parse(data);
  } catch (error) {
    return NextResponse.json(
      {
        flag: false,
        messgae: "failed to validate delivery person data",
        error: error,
      },
      { status: 400 }
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
        flag: false,
        messgae: "failed to insert delivery person data in db",
        error: error,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      flag: true,
      message: "OK",
      data: deliveryPersonData,
    },
    { status: 200 }
  );
}
