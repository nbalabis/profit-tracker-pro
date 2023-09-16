import { getAllStores } from "@/actions/stores";
import { redirect } from "next/navigation";

const EmptyExpensesPage = async () => {
  const ownedStores = await getAllStores();

  if (ownedStores.length > 0) {
    redirect(`/expenses/${ownedStores[0].id}`);
  } else {
    redirect("/create-store");
  }
};

export default EmptyExpensesPage;
