import type { NewProductSoreTS } from "../product/product-store";
import { useContext } from "react";
import { useStore } from "zustand";
import { ProductStoreContext } from "../provider/store-provider";

export const useNewProduct = <T>(
  selector: (store: NewProductSoreTS) => T,
): T => {
  const productContext = useContext(ProductStoreContext);
  if (!productContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(productContext, selector);
};
