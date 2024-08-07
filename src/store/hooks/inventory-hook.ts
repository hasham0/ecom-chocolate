import { useContext } from "react";
import { useStore } from "zustand";
import { InventoryStoreContext } from "../provider/store-provider";
import { NewInventoryStoreTS } from "../inventory/inventory-store";

export const useNewInventory = <T>(
  selector: (store: NewInventoryStoreTS) => T,
): T => {
  const context = useContext(InventoryStoreContext);

  if (!context) {
    throw new Error(
      `Zustand provider should wrap the entire Application => inventory context`,
    );
  }

  return useStore(context, selector);
};
