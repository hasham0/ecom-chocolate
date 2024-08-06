import { useContext } from "react";
import { useStore } from "zustand";
import { ProductStoreContext } from "../provider/store-provider";
import { NewProductStoreTS } from "../product/product-store";

export const useNewProduct = <T>(
  selector: (store: NewProductStoreTS) => T,
): T => {
  const productContext = useContext(ProductStoreContext);

  if (!productContext) {
    throw new Error(
      `Zustand provider should wrap the entire Application => product context`,
    );
  }

  return useStore(productContext, selector);
};
