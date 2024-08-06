import { ProductTS } from "@/lib/validators/productSchema";

export const getAllProducts = async (): Promise<ProductTS[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/products`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.data;
};

export const createPrduct = async (
  data: FormData,
): Promise<{ message: string; data: ProductTS[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/products`,
    {
      method: "POST",
      body: data,
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.data;
};
