"use client";

import { type ReactNode, createContext, useRef } from "react";
import NewProduct from "../product/product-store";
import NewWarehouse from "../warehouse/warehouse-store";
import NewDeliveryPerson from "../delivery-person/delivery-person";

export type ProductApi = ReturnType<typeof NewProduct>;
export type WarehouseApi = ReturnType<typeof NewWarehouse>;
export type DeliveryPersonApi = ReturnType<typeof NewDeliveryPerson>;

export const ProductStoreContext = createContext<ProductApi | undefined>(
  undefined,
);

export const WarehouseStoreContext = createContext<WarehouseApi | undefined>(
  undefined,
);

export const DeliveryPersonStoreContext = createContext<
  DeliveryPersonApi | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export default function ZustandStoreProvider({ children }: Props) {
  const productStoreRef = useRef<ProductApi | undefined>(undefined);
  const warehouseStoreRef = useRef<WarehouseApi | undefined>(undefined);
  const deliveryPersonStoreRef = useRef<DeliveryPersonApi | undefined>(
    undefined,
  );

  if (!productStoreRef.current) {
    productStoreRef.current = NewProduct();
  }
  if (!warehouseStoreRef.current) {
    warehouseStoreRef.current = NewWarehouse();
  }
  if (!deliveryPersonStoreRef.current) {
    deliveryPersonStoreRef.current = NewDeliveryPerson();
  }

  return (
    <ProductStoreContext.Provider value={productStoreRef.current}>
      <WarehouseStoreContext.Provider value={warehouseStoreRef.current}>
        <DeliveryPersonStoreContext.Provider
          value={deliveryPersonStoreRef.current}
        >
          {children}
        </DeliveryPersonStoreContext.Provider>
      </WarehouseStoreContext.Provider>
    </ProductStoreContext.Provider>
  );
}
