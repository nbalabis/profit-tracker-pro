import { getAllStores } from "@/actions/stores";
import { redirect } from "next/navigation";

const EmptyDashboardPage = async () => {
  const ownedStores = await getAllStores();

  if (ownedStores.length > 0) {
    redirect(`/dashboard/${ownedStores[0].id}`);
  } else {
    redirect("/create-store");
  }
};

export default EmptyDashboardPage;
