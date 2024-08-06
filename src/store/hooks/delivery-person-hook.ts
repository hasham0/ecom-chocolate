import { useContext } from "react";
import { useStore } from "zustand";
import { DeliveryPersonStoreContext } from "../provider/store-provider";
import { NewDeliveryStoreTS } from "../delivery-person/delivery-person";

export const useDeliveryPerson = <T>(
  selector: (store: NewDeliveryStoreTS) => T,
): T => {
  const context = useContext(DeliveryPersonStoreContext);

  if (!context) {
    throw new Error(
      `Zustand provider should wrap the entire Application => delivery context`,
    );
  }

  return useStore(context, selector);
};
