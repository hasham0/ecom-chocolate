import { ProductTS } from "@/types";

export const getAllProducts = async (): Promise<ProductTS[]> => {
  // Assuming you are using fetch to get the data from an API
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

  return result.data; // Adjust this line based on the structure of your API response
};
