import { Expense, Product } from "@prisma/client";

import {
  filterExpensesByTimeFrame,
  filterProductsByTimeFrame,
} from "@/lib/utils";
import { DataTable } from "./data-table";
import { transactionColumns } from "./transaction-columns";

interface TrasnactionsTableProps {
  products: Product[];
  expenses: Expense[];
  timeFrame: string;
}

export type Transaction = {
  transactionId: string;
  name: string;
  categoryValue: string;
  action: string;
  actionDate: Date;
  price: number;
};

const TransactionsTable: React.FC<TrasnactionsTableProps> = ({
  products,
  expenses,
  timeFrame,
}) => {
  // Get transaction data
  const transactions = getTransactions(products, expenses, timeFrame);

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
  expenses: Expense[],
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

  // Filter expenses in timeFrame
  const filteredExpenses = filterExpensesByTimeFrame(expenses, timeFrame);

  // Add sourced products to transactions
  sourcedProducts.forEach((product) => {
    transactions.push({
      transactionId: product.id,
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
        transactionId: product.id,
        name: product.name,
        categoryValue: product.category,
        action: "Sold",
        actionDate: product.saleDate,
        price: product.salePrice,
      });
    }
  });

  // Add expenses to transactions
  filteredExpenses.forEach((expense) => {
    transactions.push({
      transactionId: expense.id,
      name: expense.title,
      categoryValue: "expense",
      action: "Expense",
      actionDate: expense.date,
      price: expense.price,
    });
  });

  return transactions;
};

export default TransactionsTable;
