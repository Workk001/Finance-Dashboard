import type { Category, CategoryInfo } from "@/types";

export const CATEGORIES: Record<Category, CategoryInfo> = {
  food: { id: "food", label: "Food & Dining", color: "#f59e0b", icon: "UtensilsCrossed" },
  transport: { id: "transport", label: "Transport", color: "#3b82f6", icon: "Car" },
  shopping: { id: "shopping", label: "Shopping", color: "#ec4899", icon: "ShoppingBag" },
  bills: { id: "bills", label: "Bills & Utilities", color: "#8b5cf6", icon: "Receipt" },
  entertainment: { id: "entertainment", label: "Entertainment", color: "#f97316", icon: "Gamepad2" },
  health: { id: "health", label: "Health", color: "#10b981", icon: "Heart" },
  education: { id: "education", label: "Education", color: "#06b6d4", icon: "GraduationCap" },
  salary: { id: "salary", label: "Salary", color: "#22c55e", icon: "Banknote" },
  freelance: { id: "freelance", label: "Freelance", color: "#14b8a6", icon: "Laptop" },
  investment: { id: "investment", label: "Investment", color: "#6366f1", icon: "TrendingUp" },
  other: { id: "other", label: "Other", color: "#64748b", icon: "MoreHorizontal" },
};

export const EXPENSE_CATEGORIES: Category[] = [
  "food", "transport", "shopping", "bills", "entertainment", "health", "education", "other",
];

export const INCOME_CATEGORIES: Category[] = ["salary", "freelance", "investment", "other"];

export function getCategoryInfo(category: Category): CategoryInfo {
  return CATEGORIES[category];
}
