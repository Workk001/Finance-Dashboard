import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import type { MonthlyData, Category } from "@/types";
import { CATEGORIES } from "@/data/categories";

export function useInsights() {
  const transactions = useStore((s) => s.transactions);

  return useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    // Category breakdown
    const categoryTotals = transactions
      .filter((t) => t.type === "expense")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const categoryBreakdown = Object.entries(categoryTotals)
      .map(([cat, amount]) => ({
        category: cat as Category,
        label: CATEGORIES[cat as Category]?.label ?? cat,
        color: CATEGORIES[cat as Category]?.color ?? "#64748b",
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    const highestSpendingCategory = categoryBreakdown[0] || null;

    // Monthly data
    const monthMap = new Map<string, { income: number; expenses: number }>();
    transactions.forEach((t) => {
      const month = t.date.substring(0, 7);
      const existing = monthMap.get(month) || { income: 0, expenses: 0 };
      if (t.type === "income") existing.income += t.amount;
      else existing.expenses += t.amount;
      monthMap.set(month, existing);
    });

    const monthlyData: MonthlyData[] = Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
        net: data.income - data.expenses,
      }));

    // Month-over-month comparison
    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];
    const expenseChange =
      currentMonth && previousMonth && previousMonth.expenses > 0
        ? ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100
        : 0;
    const incomeChange =
      currentMonth && previousMonth && previousMonth.income > 0
        ? ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100
        : 0;

    // Average transaction
    const avgTransaction =
      transactions.length > 0
        ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length
        : 0;

    // Most active day
    const dayCount: Record<string, number> = {};
    transactions.forEach((t) => {
      const day = new Date(t.date).toLocaleDateString("en", { weekday: "long" });
      dayCount[day] = (dayCount[day] || 0) + 1;
    });
    const mostActiveDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

    // Savings trend
    const recentMonths = monthlyData.slice(-3);
    const savingsRates = recentMonths.map((m) =>
      m.income > 0 ? ((m.income - m.expenses) / m.income) * 100 : 0
    );
    let savingsTrend: "improving" | "declining" | "stable" = "stable";
    if (savingsRates.length >= 2) {
      const diff = savingsRates[savingsRates.length - 1] - savingsRates[0];
      if (diff > 3) savingsTrend = "improving";
      else if (diff < -3) savingsTrend = "declining";
    }

    // Balance trend (cumulative)
    let runningBalance = 0;
    const balanceTrend = monthlyData.map((m) => {
      runningBalance += m.net;
      return { month: m.month, balance: runningBalance };
    });

    return {
      totalIncome,
      totalExpenses,
      totalBalance,
      savingsRate,
      categoryBreakdown,
      highestSpendingCategory,
      monthlyData,
      balanceTrend,
      expenseChange,
      incomeChange,
      avgTransaction,
      mostActiveDay,
      savingsTrend,
      transactionCount: transactions.length,
    };
  }, [transactions]);
}
