import TempPage from "./tempPage";
import { getStoreById } from "@/actions/stores";
import { getAllExpenses } from "@/actions/expenses";
import { DataTable } from "@/components/tables/data-table";
import { expenseColumns } from "@/components/tables/expense-columns";

interface ExpensesPageProps {
  params: { storeId: string };
}

const ExpensesPage: React.FC<ExpensesPageProps> = async ({ params }) => {
  const store = await getStoreById(params.storeId);
  const expenses = await getAllExpenses(params.storeId);

  if (!store) return <div>Store not found</div>;

  return (
    <div className="p-3 md:p-6">
      {/* this is where the add btn is */}
      {/* <TempPage /> */}

      <DataTable
        columns={expenseColumns}
        data={expenses}
        addBtnForStore={store}
        withSearch
        pagination="full"
      />
    </div>
  );
};

export default ExpensesPage;
