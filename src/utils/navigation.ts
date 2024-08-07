import { navItemTS } from "@/types";
import {
  Blocks,
  HomeIcon,
  LayersIcon,
  ShoppingCart,
  Users,
  WarehouseIcon,
} from "lucide-react";

const navItems: Array<navItemTS> = [
  { label: "Dashboard", href: "/admin", icon: HomeIcon },
  { label: "Products", href: "/admin/products", icon: LayersIcon },
  { label: "Warehouses", href: "/admin/warehouses", icon: WarehouseIcon },
  {
    label: "Delivery Persons",
    href: "/admin/delivery-persons",
    icon: Users,
  },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Inventories", href: "/admin/inventories", icon: Blocks },
];

export default navItems;
