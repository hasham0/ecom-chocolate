import { useContext } from "react";
import { useStore } from "zustand";
import { WarehouseStoreContext } from "../provider/store-provider";
import { NewWarehouseStoreTS } from "../warehouse/warehouse-store";

export const useWarehouse = <T>(
  selector: (store: NewWarehouseStoreTS) => T,
): T => {
  const warehouseContext = useContext(WarehouseStoreContext);
  if (!warehouseContext) {
    throw new Error(
      `Zustand provider should wrap the entire Application => warehouse context`,
    );
  }

  return useStore(warehouseContext, selector);
};
