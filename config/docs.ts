import { LayoutDashboard, Settings } from "lucide-react";

export const routeConfig = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "secondary",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "secondary",
  },
];

export type RouteConfig = typeof routeConfig;
