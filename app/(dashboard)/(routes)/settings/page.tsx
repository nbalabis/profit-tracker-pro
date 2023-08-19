import { UserProfile } from "@clerk/nextjs";
import Balancer from "react-wrap-balancer";

import {
  checkSubscription,
  getRemainingTrialProducts,
  getRemainingTrialStores,
} from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "@/components/subscription-button";

const SettingsPage = async () => {
  const isSubscribed = await checkSubscription();
  const remainingProducts = await getRemainingTrialProducts();
  const remainingStores = await getRemainingTrialStores();

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col items-center justify-center p-7">
        <div className="m-7 flex w-full flex-col gap-8 rounded-2xl bg-white px-6 py-10 shadow-2xl md:w-[55rem]">
          <h1 className="text-3xl font-bold">Subscription</h1>

          <div className="flex flex-col gap-2">
            <h2>Current Plan</h2>
            <Separator />
            <p className="px-4 py-3 text-sm text-muted-foreground">
              <Balancer>
                {isSubscribed
                  ? "You have an active subscription to Profit Tracker Pro"
                  : "You are currently on a free trial of Profit Tracker Pro"}
              </Balancer>
            </p>
          </div>
          {!isSubscribed && (
            <div className="flex flex-col gap-2">
              <h2>Free Tier Progress</h2>
              <Separator />
              <p className="px-4 py-3 text-sm text-muted-foreground">
                <Balancer>
                  You currently have{" "}
                  <span className="font-semibold">{remainingStores}</span>{" "}
                  stores and{" "}
                  <span className="font-semibold">{remainingProducts}</span>{" "}
                  products remaining in your free trial
                </Balancer>
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h2>{isSubscribed ? "Manage" : "Upgrade"}</h2>
            <Separator />
            <p className="px-4 py-3 text-sm text-muted-foreground">
              <SubscriptionButton isSubscribed={isSubscribed} />
            </p>
          </div>
        </div>
      </div>
      <div className="mb-7 flex w-full flex-col items-center justify-center">
        <UserProfile />
      </div>
    </div>
  );
};

export default SettingsPage;
