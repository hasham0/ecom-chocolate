import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";
import productSchema, { isServer } from "@/lib/validators/productsSchema";
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
        messgae: "failed to fetch product data from db",
        error: error,
      },
      { status: 500 },
    );
  }

  // checking product data length
  if (!allProducts.length) {
    return NextResponse.json(
      {
        message: "products not found in db",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "OK",
      data: allProducts,
    },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  // //! check user => only admin
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return Response.json({ message: "Not allowed" }, { status: 401 });
  // }
  // // todo: check user access.
  // // @ts-ignore
  // if (session.token.role !== "admin") {
  //   return Response.json({ message: "Not allowed" }, { status: 403 });
  // }
  // recive and validate product data
  const data = await request.formData();

  let validateData;

  try {
    validateData = await productSchema.parseAsync({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to validate data",
        error: error,
      },
      { status: 400 },
    );
  }
  // convert image string into buffer and store it
  const inputImage = isServer
    ? (validateData.image as File)
    : (validateData.image as FileList)[0];

  const filename = `${Date.now()}.${inputImage.name.split(".").slice(-1)}`;
  try {
    const buffer = Buffer.from(await inputImage.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "public/assets", filename),
      buffer,
    );
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "failed to upload image",
        error: error,
      },
      { status: 500 },
    );
  }

  // inser product data in db
  let productData: productsInsertTS[];
  try {
    productData = await db
      .insert(products)
      .values({ ...validateData, image: filename })
      .returning()
      .execute();
  } catch (error) {
    await fs.unlink(path.join(process.cwd(), "public/assets", filename));
    return NextResponse.json(
      {
        messgae: "failed to insert product data in db",
        error: error,
      },
      { status: 500 },
    );
  }
  return NextResponse.json(
    {
      message: "OK",
      data: productData,
    },
    { status: 201 },
  );
}
