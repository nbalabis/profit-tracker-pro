import { getStoreById } from "@/actions/stores";

interface ExpensesPageProps {
  params: { storeId: string };
}

const ExpensesPage: React.FC<ExpensesPageProps> = async ({ params }) => {
  const store = await getStoreById(params.storeId);
  //TODO: get expenses

  if (!store) return <div>Store not found</div>;

  return (
    <div className="p-3 md:p-6">
      <h1>Store: {store.id}</h1>
    </div>
  );
};

export default ExpensesPage;
