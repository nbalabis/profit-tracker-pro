"use client";

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { routeConfig } from "@/config/docs";
import MobileSidebar from "./mobile-sidebar";

interface NavbarProps {
  isSubscribed: boolean;
}

const Navbar = ({ isSubscribed = false }: NavbarProps) => {
  const pathname = usePathname();
  console.log(pathname);

  const [currentRoute, setCurrentRoute] = useState(routeConfig[0]);

  useEffect(() => {
    const newRoute = routeConfig.find((route) => pathname.includes(route.href));
    setCurrentRoute(newRoute || currentRoute);
  }, [pathname]);

  return (
    <div className="flex items-center justify-between p-3 pb-0 md:p-6 md:pb-0">
      <div className="flex items-center gap-5 md:gap-0">
        <MobileSidebar isSubscribed={isSubscribed} />
        <div className="flex items-center gap-x-3">
          <div className="w-fit rounded-md bg-gray-700/10 p-2">
            <currentRoute.icon className="h-10 w-10 text-gray-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{currentRoute.label}</h2>
            <p className="text-sm text-muted-foreground">
              {currentRoute.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
