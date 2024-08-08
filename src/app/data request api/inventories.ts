import { InvetoriesTS } from "@/lib/validators/inventoriesSchema";

type InventryReqTS = {
  message?: string;
  data?: InvetoriesTS[];
  status?: boolean;
};

export const getAllInventries = async (): Promise<InventryReqTS> => {
  try {
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
      throw new Error(result.message);
    }
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = (error as { message: string }).message;
    return {
      status: false,
      message: err,
    };
  }
};

export const newInventry = async (
  data: InvetoriesTS,
): Promise<InventryReqTS> => {
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
      throw new Error(result.message);
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
