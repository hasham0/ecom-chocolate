import { WarehouseTS } from "@/lib/validators/warehouseSchema";

type WarehouseReqTS = {
  status?: boolean;
  message?: string;
  data?: WarehouseTS[];
};
export const getAllWarehouses = async (): Promise<WarehouseReqTS> => {
  try {
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

export const createWarehouse = async (
  data: WarehouseTS,
): Promise<WarehouseReqTS> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/warehouse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
