"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import { siteConfig } from "@/config/site";
import { routeConfig } from "@/config/docs";
import SubscriptionButton from "@/components/subscription-button";
import StoreSelector from "./store-selector";
import { Progress } from "../ui/progress";
import { TRIAL_PRODUCT_LIMIT } from "@/config/subscription";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface SidebarProps {
  isSubscribed: boolean;
  ownedStores: Store[];
  remainingProducts: number;
}

const Sidebar = ({
  isSubscribed = false,
  ownedStores = [],
  remainingProducts,
}: SidebarProps) => {
  const pathname = usePathname();
  const { storeId } = useParams();

  return (
    <div className="flex h-full flex-col space-y-4 bg-secondary py-4 text-secondary-foreground">
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
          {routeConfig.map(
            (route) =>
              route.mainNav && (
                <Link
                  href={
                    route.isStoreSpecific && storeId
                      ? `${route.href}/${storeId}`
                      : route.href
                  }
                  key={route.href}
                  className={cn(
                    "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-secondary-foreground/10 hover:text-secondary-foreground hover:shadow-sm",
                    pathname === route.href ||
                      (route.isStoreSpecific && pathname.startsWith(route.href))
                      ? "bg-secondary-foreground/10 text-secondary-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  <div className="flex flex-1 items-center">
                    <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                    {route.label}
                  </div>
                </Link>
              ),
          )}
        </div>
      </div>
      {!isSubscribed && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted-foreground/50 px-8 py-6">
            <p className="text-xs">Free Items Tracked</p>
            <Progress
              className="my-1"
              value={
                ((TRIAL_PRODUCT_LIMIT - remainingProducts) /
                  TRIAL_PRODUCT_LIMIT) *
                100
              }
            />
            <p className="mb-3 text-xs">
              {TRIAL_PRODUCT_LIMIT - remainingProducts} / {TRIAL_PRODUCT_LIMIT}
            </p>
            <SubscriptionButton isSubscribed={isSubscribed} />
          </div>
        </div>
      )}
      {ownedStores.length > 0 && (
        <div className="px-3 py-2">
          <StoreSelector stores={ownedStores} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
