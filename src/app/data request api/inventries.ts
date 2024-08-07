import { InvetriesTS } from "@/lib/validators/inventriesSchema";

export const getAllInventries = async (): Promise<{
  message: string;
  data: InvetriesTS[];
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/inventries`,
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
  data: InvetriesTS,
): Promise<{ message: string; data: InvetriesTS[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/inventries`,
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
