import { LayoutDashboard, Settings } from "lucide-react";

export const routeConfig = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    isStoreSpecific: true,
    color: "secondary",
  },
  {
    label: "Products",
    icon: LayoutDashboard,
    href: "/products",
    isStoreSpecific: true,
    color: "secondary",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    isStoreSpecific: false,
    color: "secondary",
  },
];

export type RouteConfig = typeof routeConfig;
