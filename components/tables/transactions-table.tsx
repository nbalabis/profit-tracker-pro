import { Product } from "@prisma/client";

import { DataTable } from "./data-table";
import { filterProductsByTimeFrame } from "@/lib/utils";
import { transactionColumns } from "./transaction-columns";

interface TrasnactionsTableProps {
  products: Product[];
  timeFrame: string;
}

export type Transaction = {
  productId: string;
  name: string;
  categoryValue: string;
  action: string;
  actionDate: Date;
  price: number;
};

const TransactionsTable: React.FC<TrasnactionsTableProps> = ({
  products,
  timeFrame,
}) => {
  // Get transaction data
  const transactions = getTransactions(products, timeFrame);

  return (
    <DataTable
      data={transactions}
      columns={transactionColumns}
      pagination="simple"
    />
  );
};

const getTransactions = (
  products: Product[],
  timeFrame: string,
): Transaction[] => {
  // Initialize transaction data
  let transactions: Transaction[] = [];

  // Filter products sourced in timeFrame
  const sourcedProducts = filterProductsByTimeFrame(
    products,
    timeFrame,
    "sourceDate",
  );

  //Filter products sold in timeFrame
  const soldProducts = filterProductsByTimeFrame(
    products,
    timeFrame,
    "saleDate",
  );

  // Add sourced products to transactions
  sourcedProducts.forEach((product) => {
    transactions.push({
      productId: product.id,
      name: product.name,
      categoryValue: product.category,
      action: "Purchased",
      actionDate: product.sourceDate,
      price: product.sourcePrice,
    });
  });

  // Add sold products to transactions
  soldProducts.forEach((product) => {
    if (product.saleDate && product.salePrice) {
      transactions.push({
        productId: product.id,
        name: product.name,
        categoryValue: product.category,
        action: "Sold",
        actionDate: product.saleDate,
        price: product.salePrice,
      });
    }
  });

  return transactions;
};

export default TransactionsTable;
