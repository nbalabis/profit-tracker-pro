import Sidebar from "@/components/navigation/sidebar";
import Navbar from "@/components/navigation/navbar";
import { checkSubscription } from "@/lib/subscription";
import { getAllStores } from "@/actions/stores";

const SignedInLayout = async ({ children }: { children: React.ReactNode }) => {
  const isSubscribed = await checkSubscription();
  const ownedStores = await getAllStores();

  return (
    <div className="relative h-full">
      <div className=" hidden h-full md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar isSubscribed={isSubscribed} ownedStores={ownedStores} />
      </div>
      <main className="md:pl-72">
        <Navbar isSubscribed={isSubscribed} />
        {children}
      </main>
    </div>
  );
};

export default SignedInLayout;
