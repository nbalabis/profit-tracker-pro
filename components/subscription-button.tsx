"use client";

import { useState } from "react";
import axios from "axios";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  isSubscribed: boolean;
}

const SubscriptionButton = ({
  isSubscribed = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className={cn(
        isSubscribed
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : "bg-gradient-to-r from-[#3361EB] to-[#59C3C8] text-secondary-foreground",
      )}
    >
      {isSubscribed ? "Manage Subscription" : "Subscribe"}
      {!isSubscribed && (
        <Zap className="ml-2 h-4 w-4 fill-secondary-foreground" />
      )}
    </Button>
  );
};

export default SubscriptionButton;
