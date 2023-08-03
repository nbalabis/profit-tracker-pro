import { getAllStores } from "@/actions/stores";
import { redirect } from "next/navigation";

const EmptyProductsPage = async () => {
  const ownedStores = await getAllStores();

  if (ownedStores.length > 0) {
    redirect(`/products/${ownedStores[0].id}`);
  } else {
    redirect("/create-store");
  }
};

export default EmptyProductsPage;