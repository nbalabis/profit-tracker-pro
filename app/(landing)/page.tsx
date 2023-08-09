import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

const LandingPage = () => {
  // If user is logged in, redirect to dashboard
  const { userId } = auth();
  if (userId) redirect("/dashboard");

  return (
    <div>
      <div>
        <Link href="sign-in">
          <Button>Log In</Button>
        </Link>
        <Link href="sign-up">
          <Button>Sign Up</Button>
        </Link>
      </div>
      <h1>Landing Page</h1>
    </div>
  );
};

export default LandingPage;
