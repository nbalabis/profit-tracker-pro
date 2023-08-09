import { DataTable } from "@/components/tables/data-table";
import { allProductsColumns } from "@/components/tables/product-columns";
import { getAllProducts } from "@/actions/products";
import { getStoreById } from "@/actions/stores";

interface ProductPageProps {
  params: { storeId: string };
}

const ProductsPage: React.FC<ProductPageProps> = async ({ params }) => {
  const store = await getStoreById(params.storeId);
  const products = await getAllProducts(params.storeId);

  if (!store) return <div>Store not found</div>;

  return (
    <div className="p-3 md:p-6">
      <DataTable
        columns={allProductsColumns}
        data={products}
        addBtnForStore={store}
        withSearch
        pagination="full"
      />
    </div>
  );
};

export default ProductsPage;
