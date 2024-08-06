import { useContext } from "react";
import { useStore } from "zustand";
import { WarehouseStoreContext } from "../provider/store-provider";
import { NewWarehouseStoreTS } from "../warehouse/warehouse-store";

export const useWarehouse = <T>(
  selector: (store: NewWarehouseStoreTS) => T,
): T => {
  const context = useContext(WarehouseStoreContext);
  if (!context) {
    throw new Error(
      `Zustand provider should wrap the entire Application => warehouse context`,
    );
  }

  return useStore(context, selector);
};
