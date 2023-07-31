"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { routeConfig } from "@/config/docs";
import SubscriptionButton from "@/components/subscription-button";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface SidebarProps {
  isSubscribed: boolean;
}

const Sidebar = ({ isSubscribed = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-primary py-4 text-secondary">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="mb-14 flex items-center pl-3">
          <div className="relative mr-4 h-8 w-8">
            <Image fill alt="logo" src="/images/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            {siteConfig.name}
          </h1>
        </Link>
        <div className="space-y-1">
          {routeConfig.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-secondary/10 hover:text-secondary",
                pathname === route.href
                  ? "bg-secondary/10 text-secondary"
                  : "text-muted-foreground",
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {!isSubscribed && (
        <div className="p-6 text-center">
          <SubscriptionButton isSubscribed={isSubscribed} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
