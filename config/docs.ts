import { LayoutDashboard, Package, Settings, Store } from "lucide-react";

export const routeConfig = [
  {
    label: "Dashboard",
    mainNav: true,
    icon: LayoutDashboard,
    href: "/dashboard",
    isStoreSpecific: true,
    color: "secondary",
    description: "View your store's performance and analytics",
  },
  {
    label: "Products",
    icon: Package,
    mainNav: true,
    href: "/products",
    isStoreSpecific: true,
    color: "secondary",
    description: "Add, edit, and manage your products",
  },
  {
    label: "Settings",
    icon: Settings,
    mainNav: true,
    href: "/settings",
    isStoreSpecific: false,
    color: "secondary",
    description: "Manage your account settings and preferences",
  },
  {
    label: "Create a Store",
    icon: Store,
    mainNav: false,
    href: "/create-store",
    isStoreSpecific: false,
    color: "secondary",
    description: "Create a new store and start adding products",
  },
];

export type RouteConfig = typeof routeConfig;
