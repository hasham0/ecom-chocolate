import { DeliveryPersonTS } from "@/lib/validators/deliveryPersonsSchema";

type DeliveryPersonReqTS = {
  status?: boolean;
  data?: DeliveryPersonTS[];
  message?: string;
};

export const getAllDeliveryPerson = async (): Promise<DeliveryPersonReqTS> => {
  try {
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

export const newDeliveryPerson = async (
  data: DeliveryPersonTS,
): Promise<DeliveryPersonReqTS> => {
  try {
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
