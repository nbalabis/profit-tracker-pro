import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { MoveRight } from "lucide-react";
import { redirect } from "next/navigation";
import { Balancer } from "react-wrap-balancer";

import { Button } from "@/components/ui/button";
import LandingNavbar from "@/components/navigation/landing-navbar";

const LandingPage = () => {
  // If user is logged in, redirect to dashboard
  const { userId } = auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="">
      <LandingNavbar />

      {/* MAIN HERO SECTION */}
      <div className="flex w-full bg-[url('../public/background.svg')]">
        <div className="hidden w-1/4 bg-gradient-to-r from-transparent from-90% to-background md:flex"></div>
        <div className="flex flex-col items-center justify-center gap-6 bg-background px-6 py-12 md:w-1/2 md:py-24">
          <h1 className="text-center text-5xl font-bold tracking-tight">
            <Balancer>
              Manage your reselling inventory like never before
            </Balancer>
          </h1>
          <h3 className="text-center text-lg text-muted-foreground">
            <Balancer>
              The only inventory tracking system built with resellers in mind.
              <br /> Add products, track trends, and analyze your performance.
            </Balancer>
          </h3>
          <div className="flex items-center justify-center gap-6">
            <Link href="/sign-up">
              <Button className="rounded-full" size="lg">
                Sign Up for Free
              </Button>
            </Link>
            <Link href="#about">
              <Button className="rounded-full" variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden w-1/4 bg-gradient-to-l from-transparent from-90% to-background md:flex"></div>
      </div>

      {/* DEMO SHOWCASE */}
      <div
        className="flex items-center justify-center bg-muted py-12 md:py-24"
        id="about"
      >
        <div className="relative flex aspect-video w-11/12 overflow-hidden rounded-lg shadow-2xl md:w-3/4">
          <Image
            src="/images/dashboard-screenshot-monthly.png"
            fill
            alt="Dashboard Screenshot"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div
        className="flex flex-col gap-12 p-12 md:gap-24 md:p-24"
        id="features"
      >
        <div className="flex w-full  flex-col items-center gap-12 md:flex-row md:gap-24">
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-primary">Analyze</span>
              <br />
              <Balancer>key metrics in one place</Balancer>
            </h2>
            <h3 className="text-md text-muted-foreground">
              <Balancer>
                View your most important information in a single glance so you
                can make business decisions with confidence
              </Balancer>
            </h3>
            <Link
              href="/sign-up"
              className="flex items-center text-primary hover:text-primary/90"
            >
              See More <MoveRight className="ml-2" />
            </Link>
          </div>
          <div className="relative flex h-56 w-full flex-col rounded-2xl bg-muted md:w-1/2">
            <div className="absolute left-1/2 top-1/2 z-30 h-32 w-80 -translate-x-1/2 -translate-y-full scale-105 transform overflow-hidden rounded-lg border shadow-lg">
              <Image
                src="/images/profit-card-screenshot-monthly.png"
                alt="Profit Card Screenshot"
                fill
              />
            </div>
            <div className="absolute left-1/2 top-1/2 z-20 h-32 w-80 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-lg border shadow-lg">
              <Image
                src="/images/roi-card-screenshot-monthly.png"
                alt="ROI Card Screenshot"
                fill
              />
            </div>
            <div className="absolute left-1/2 top-1/2 z-10 h-32 w-80 -translate-x-1/2 scale-95 transform overflow-hidden rounded-lg border shadow-lg">
              <Image
                src="/images/revenue-card-screenshot-monthly.png"
                alt="Revenue Card Screenshot"
                fill
              />
            </div>
          </div>
        </div>

        <div className="flex w-full  flex-col items-center gap-12 md:flex-row md:gap-24">
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-primary">Grow</span>
              <br />
              <Balancer>your business by analyzing trends</Balancer>
            </h2>
            <h3 className="text-md text-muted-foreground">
              <Balancer>
                Learn more about your customers by analyzing trend data
                displayed in easy-to-read charts
              </Balancer>
            </h3>
            <Link
              href="/sign-up"
              className="flex items-center text-primary hover:text-primary/90"
            >
              See More <MoveRight className="ml-2" />
            </Link>
          </div>
          <div className="relative flex h-56 w-full flex-col rounded-2xl bg-muted md:order-first md:w-1/2">
            <div className="absolute left-1/2 top-1/2 z-20 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-lg border shadow-lg">
              <Image
                src="/images/category-chart-screenshot.png"
                alt="Profit Card Screenshot"
                fill
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div
        className="flex w-full flex-col items-center gap-12 bg-gradient-to-br from-primary/100 from-30% via-primary to-primary/10 p-12 text-primary-foreground md:flex-row md:gap-24 md:p-24"
        id="pricing"
      >
        <div className="flex w-full  flex-col items-center gap-6 md:flex-row md:gap-24">
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <h2 className="text-center text-3xl font-bold tracking-tight ">
              <Balancer>
                Made by resellers for resellers.
                <br />
                Use it for free
              </Balancer>
            </h2>
          </div>
          <div className="flex w-full flex-col gap-6 text-center md:w-1/2 md:text-start">
            <h3 className="text-md font-light text-primary-foreground">
              <Balancer>
                Profit Tracker Pro is the only inventory tracking system built
                by resellers for resellers. We built this to help us ditch our
                old spreadsheets and grow our busines. We know it will help you
                do the same.
              </Balancer>
            </h3>
            <Link href="/sign-up">
              <Button className="rounded-full border border-secondary-foreground bg-transparent hover:bg-accent hover:text-primary">
                Try it for free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
