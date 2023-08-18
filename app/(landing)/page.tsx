import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import LandingNavbar from "@/components/navigation/landing-navbar";

const LandingPage = () => {
  // If user is logged in, redirect to dashboard
  const { userId } = auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="">
      <LandingNavbar />
      <div>Hero</div>
      <div className="">Demo</div>
      <div>
        <div>Feature1</div>
        <div>Feature2</div>
      </div>
      <div>CTA</div>
    </div>
  );
};

export default LandingPage;
