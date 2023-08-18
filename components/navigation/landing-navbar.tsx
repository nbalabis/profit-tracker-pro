import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import LandingMobileNavbar from "./landing-mobile-navbar";
import { landingRouteConfig } from "@/config/docs";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingNavbar = () => {
  return (
    <nav className="flex items-center px-6 py-6 md:px-24">
      <Link
        href="/"
        className="flex w-full items-center justify-start md:basis-1/4"
      >
        <div className="relative mr-4 h-8 w-8">
          <Image
            fill
            alt="logo"
            src="/images/logo.png"
            className="aspect-square"
          />
        </div>
        <h1 className={cn("text-2xl font-bold", montserrat.className)}>
          {siteConfig.name}
        </h1>
      </Link>
      <div className="basis:3/4 hidden w-full md:flex">
        <div className="flex basis-2/3 items-center justify-center gap-6">
          {landingRouteConfig.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="hover:text-muted-foreground"
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="basis-1/3 items-center text-end">
          <Link href="/sign-in">
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <LandingMobileNavbar />
    </nav>
  );
};

export default LandingNavbar;
