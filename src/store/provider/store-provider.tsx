"use client";

import { type ReactNode, createContext, useRef } from "react";
import NewProduct from "../product/product-store";

export type ProductApi = ReturnType<typeof NewProduct>;

type Props = {
  children: ReactNode;
};

export const ProductStoreContext = createContext<ProductApi | undefined>(
  undefined,
);

export default function ZustandStoreProvider({ children }: Props) {
  const storeRef = useRef<ProductApi>();
  if (!storeRef.current) {
    storeRef.current = NewProduct();
  }
  return (
    <ProductStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductStoreContext.Provider>
  );
}
