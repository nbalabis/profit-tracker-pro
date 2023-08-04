import { getStoreById } from "@/actions/stores";
import { Card } from "@/components/ui/card";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await getStoreById(params.storeId);

  if (!store) return <div>Store not found</div>;

  return (
    <div className="space-y-3 p-3 md:space-y-6 md:p-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {store.name}'s Dashboard
      </h1>
      <div className="flex gap-5">
        <p>Last 24h</p>
        <p className="underline">Last Week</p>
        <p>Last Month</p>
        <p>Last Year</p>
      </div>
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
          <Card className="h-32 grow">StatCard 1</Card>
          <Card className="h-32 grow">StatCard 2</Card>
          <Card className="h-32 grow">StatCard 3</Card>
          <Card className="h-32 grow">StatCard 4</Card>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
          <Card className="h-96 grow">Sales Graph</Card>
          <Card className="h-96 md:w-96">Category Chart</Card>
        </div>
        <div>
          <Card className="h-96">Transactions Table</Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
