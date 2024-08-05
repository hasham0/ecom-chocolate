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
  { label: "Order", href: "/admin/orders", icon: ShoppingCart },
  { label: "Inventries", href: "/admin/inventries", icon: Blocks },
];

export default navItems;
