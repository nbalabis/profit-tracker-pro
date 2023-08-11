import { getStoreById } from "@/actions/stores";
import { getAllProducts } from "@/actions/products";
import DashboardView from "@/components/dashboard-view";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  /* GET CURRENT STORE */
  const store = await getStoreById(params.storeId);
  if (!store) return <div>Store not found</div>;

  /* GET ALL PRODUCTS FOR STORE */
  const products = await getAllProducts(params.storeId);

  return (
    <div className="space-y-3 p-3 md:space-y-6 md:p-6">
      <DashboardView products={products} />
    </div>
  );
};

export default DashboardPage;
