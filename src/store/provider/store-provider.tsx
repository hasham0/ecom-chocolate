"use client";

import { type ReactNode, createContext, useRef } from "react";
import NewProduct from "../product/product-store";
import NewWarehouse from "../warehouse/warehouse-store";

export type ProductApi = ReturnType<typeof NewProduct>;
export type WarehouseApi = ReturnType<typeof NewWarehouse>;

type Props = {
  children: ReactNode;
};

export const ProductStoreContext = createContext<ProductApi | undefined>(
  undefined,
);

export const WarehouseStoreContext = createContext<WarehouseApi | undefined>(
  undefined,
);

export default function ZustandStoreProvider({ children }: Props) {
  const storeRef = useRef<ProductApi | WarehouseApi>();
  if (!storeRef.current) {
    storeRef.current = NewProduct();
  }
  return (
    <ProductStoreContext.Provider value={storeRef.current}>
      <WarehouseStoreContext.Provider value={storeRef.current}>
        {children}
      </WarehouseStoreContext.Provider>
    </ProductStoreContext.Provider>
  );
}
