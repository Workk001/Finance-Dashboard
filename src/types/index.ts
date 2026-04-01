export type Role = "viewer" | "admin";
export type Theme = "light" | "dark";
export type TransactionType = "income" | "expense";

export type Category =
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "entertainment"
  | "health"
  | "education"
  | "salary"
  | "freelance"
  | "investment"
  | "other";

export interface CategoryInfo {
  id: Category;
  label: string;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export type TransactionInput = Omit<Transaction, "id">;

export interface FilterState {
  search: string;
  categories: Category[];
  type: TransactionType | "all";
  dateFrom: string;
  dateTo: string;
  sortBy: "date" | "amount" | "category";
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}
