import { DeliveryPersonTS } from "@/lib/validators/deliveryPersonsSchema";
import { InvetoriesTS } from "@/lib/validators/inventoriesSchema";
import { ProductTS } from "@/lib/validators/productsSchema";
import { WarehouseTS } from "@/lib/validators/warehouseSchema";
import { LucideIcon } from "lucide-react";

interface navItemTS {
  label: string;
  href: string;
  icon: LucideIcon;
}

type Common = {
  status?: boolean;
  message?: string;
};

type ProductReqTS = Common & {
  data?: ProductTS[];
};

type WarehouseReqTS = Common & {
  data?: WarehouseTS[];
};

type InventryReqTS = Common & {
  data?: InvetoriesTS[];
};

type DeliveryPersonReqTS = Common & {
  data?: DeliveryPersonTS[];
};
export type {
  navItemTS,
  ProductReqTS,
  WarehouseReqTS,
  InventryReqTS,
  DeliveryPersonReqTS,
};
