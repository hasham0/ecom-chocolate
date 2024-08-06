import { DeliveryPersonTS } from "@/lib/validators/deliveryPersonSchema";

export const getAllDeliveryPerson = async (): Promise<{
  message: string;
  data: DeliveryPersonTS[];
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/delivery_person`,
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

export const newDeliveryPerson = async (
  data: DeliveryPersonTS,
): Promise<{ message: string; data: DeliveryPersonTS[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/delivery_person`,
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
