import { InvetoriesTS } from "@/lib/validators/inventoriesSchema";

export const getAllInventries = async (): Promise<{
  message: string;
  data?: InvetoriesTS[];
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
  if (response.status === 404) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  }
  const result = await response.json();

  if (response.status === 400) {
    return {
      message: result.message,
    };
  }
  console.log(result);
  return result;
};

export const newInventry = async (
  data: InvetoriesTS,
): Promise<{
  message: string;
  status: Boolean;
  data?: InvetoriesTS[];
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/inventories`,
      {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      },
    );
    if (response.status === 404) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    }

    const result = await response.json();

    if (response.status === 500) {
      return {
        message: result.error.detail,
        status: false,
      };
    }
    return {
      status: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    const err = (error as { message: string }).message;
    return {
      status: false,
      message: err,
    };
  }
};
