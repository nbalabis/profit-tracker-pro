import Sidebar from "@/components/navigation/sidebar";
import Navbar from "@/components/navigation/navbar";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const isSubscribed = await checkSubscription();

  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar isSubscribed={isSubscribed} />
      </div>
      <main className="md:pl-72">
        <Navbar isSubscribed={isSubscribed} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
