import { WarehouseTS } from "@/lib/validators/warehouseSchema";

export const getAllWarehouses = async (): Promise<{
  message: string;
  data: WarehouseTS[];
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/warehouse`,
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

export const createWarehouse = async (
  data: WarehouseTS,
): Promise<{ message: string; data: WarehouseTS[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.data;
};
