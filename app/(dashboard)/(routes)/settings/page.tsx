import { Settings } from "lucide-react";

import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/subscription-button";

const SettingsPage = async () => {
  const isSubscribed = await checkSubscription();

  return (
    <div>
      <div className="mb-8 flex items-center gap-x-3 px-4 lg:px-8">
        <div className="w-fit rounded-md bg-gray-700/10 p-2">
          <Settings className="h-10 w-10 text-gray-700" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {isSubscribed
            ? "You have an active subscription"
            : "You do not have an active subscription"}
        </div>
        <SubscriptionButton isSubscribed={isSubscribed} />
      </div>
    </div>
  );
};

export default SettingsPage;
