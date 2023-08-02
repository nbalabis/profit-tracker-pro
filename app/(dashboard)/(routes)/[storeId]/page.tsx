import { getStoreById } from "@/actions/stores";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await getStoreById(params.storeId);

  if (!store) return <div>Store not found</div>;

  return (
    <div>
      <div>Dashboard Page</div>
      <div>{store.name}</div>
    </div>
  );
};

export default DashboardPage;
