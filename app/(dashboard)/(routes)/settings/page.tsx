import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/subscription-button";
import { getAllStores } from "@/actions/stores";

const SettingsPage = async () => {
  const isSubscribed = await checkSubscription();
  const stores = await getAllStores();

  return (
    <div>
      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {isSubscribed
            ? "You have an active subscription"
            : "You do not have an active subscription"}
        </div>
        <SubscriptionButton isSubscribed={isSubscribed} />
      </div>
      <div>
        <h2>Your Stores:</h2>
        {stores.map((store) => (
          <div key={store.id}>{store.name}</div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
