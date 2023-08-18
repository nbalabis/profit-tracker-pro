import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import LandingNavbar from "@/components/navigation/landing-navbar";

const LandingPage = () => {
  // If user is logged in, redirect to dashboard
  const { userId } = auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="">
      <LandingNavbar />
      <div className="flex w-full bg-[url('../public/background.svg')]">
        <div className="hidden w-1/4 bg-gradient-to-r from-transparent from-90% to-background md:flex"></div>
        <div className="flex flex-col items-center justify-center gap-6 bg-background px-6 py-24 md:w-1/2">
          <h1 className="text-center text-5xl font-bold tracking-tight">
            Manage your reselling inventory like never before
          </h1>
          <h3 className="text-center text-xl text-muted-foreground">
            The only inventory tracking system built with resellers in mind.
            <br /> Add products, track trends, and analyze your performance.
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
      <div
        className="flex items-center justify-center bg-muted py-24"
        id="about"
      >
        <div className="relative flex aspect-video w-11/12 overflow-hidden rounded-lg shadow-2xl md:w-3/4">
          <Image
            src="/images/dashboard-screenshot.png"
            fill
            alt="Dashboard Screenshot"
          />
        </div>
      </div>
      <div>
        <div>Feature1</div>
        <div>Feature2</div>
      </div>
      <div>CTA</div>
    </div>
  );
};

export default LandingPage;
