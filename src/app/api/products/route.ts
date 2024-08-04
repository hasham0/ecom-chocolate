import productSchema from "@/lib/validators/productSchema";
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
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  //! check user => only admin

  // fetch product data from db
  let allProducts: productsSelectTS[];
  try {
    allProducts = await db.select().from(products).orderBy(desc(products.id));
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to fefch product data from db",
        error: error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "OK",
      data: allProducts,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  //! check user => only admin

  // recive and validate product data
  const data = await request.formData();

  let validateData;

  try {
    validateData = productSchema.parse({
      name: data.get("name"),
      image: data.get("image"),
      description: data.get("description"),
      price: Number(data.get("price")),
    });
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to validate data",
        error: error,
      },
      { status: 400 }
    );
  }

  // convert image string into buffer and store it
  const fileName = `${Date.now()}.${validateData.image.name
    .split(".")
    .slice(-1)}`;

  try {
    const bufferImage = Buffer.from(await validateData.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "public/assets", fileName),
      bufferImage
    );
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to upload image",
        error: error,
      },
      { status: 500 }
    );
  }
  // inser product data in db
  let productData;
  try {
    productData = await db
      .insert(products)
      .values({ ...validateData, image: fileName })
      .execute();
  } catch (error) {
    await fs.unlink(path.join(process.cwd(), "public/assets", fileName));
    return NextResponse.json(
      {
        messgae: "failed to insert product data in db",
        error: error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "OK",
      data: productData,
    },
    { status: 200 }
  );
}
