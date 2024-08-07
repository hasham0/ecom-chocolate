import { InvetoriesTS } from "@/lib/validators/inventoriesSchema";

export const getAllInventries = async (): Promise<{
  message: string;
  data: InvetoriesTS[];
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/inventories`,
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
  return result;
};

export const newInventry = async (
  data: InvetoriesTS,
): Promise<{ message: string; data: InvetoriesTS[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/inventories`,
    {
      method: "POST",
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
