import { ProductTS } from "@/lib/validators/productsSchema";
import { ProductReqTS } from "@/types";

export const getAllProducts = async (): Promise<ProductReqTS> => {
  try {
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

export const getProductByID = async (id: string): Promise<ProductReqTS> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/products/${id}`,
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

export const createProduct = async (data: FormData): Promise<ProductReqTS> => {
  try {
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
    if (response.status === 400) {
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
