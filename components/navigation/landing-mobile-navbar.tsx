import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Montserrat } from "next/font/google";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { landingRouteConfig } from "@/config/docs";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingMobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex md:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        side="top"
        className="flex flex-col items-center justify-center gap-6"
      >
        <SheetClose asChild>
          <Link
            href="/"
            className="mb-6 flex w-full items-center justify-center"
          >
            <div className="relative mr-4 h-8 w-8">
              <Image
                fill
                alt="logo"
                src="/images/logo.svg"
                className="aspect-square"
              />
            </div>
            <h1 className={cn("text-2xl font-bold", montserrat.className)}>
              {siteConfig.name}
            </h1>
          </Link>
        </SheetClose>
        {landingRouteConfig.map((route) => (
          <SheetClose key={route.href} asChild>
            <Link
              href={route.href}
              className="text-center hover:text-muted-foreground"
            >
              {route.label}
            </Link>
          </SheetClose>
        ))}
        <SheetClose asChild>
          <Link href="/sign-up" className="mt-6 text-center">
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default LandingMobileNavbar;
