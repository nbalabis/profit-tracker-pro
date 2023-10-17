import { getStoreById } from "@/actions/stores";
import { getAllProducts } from "@/actions/products";
import { getAllExpenses } from "@/actions/expenses";
import DashboardView from "@/components/dashboard-view";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  /* GET CURRENT STORE */
  const store = await getStoreById(params.storeId);
  if (!store) return <div>Store not found</div>;

  /* GET ALL PRODUCTS AND EXPENSES FOR STORE */
  const products = await getAllProducts(params.storeId);
  const expenses = await getAllExpenses(params.storeId);

  return (
    <div className="space-y-3 p-3 md:space-y-6 md:p-6">
      <DashboardView products={products} expenses={expenses} />
    </div>
  );
};

export default DashboardPage;
