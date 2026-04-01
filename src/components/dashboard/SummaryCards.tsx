import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useInsights } from "@/hooks/useInsights";

const cards = [
  {
    key: "balance",
    label: "Total Balance",
    icon: Wallet,
    colorClass: "text-balance",
    bgClass: "bg-balance/10",
    getValue: (d: ReturnType<typeof useInsights>) => d.totalBalance,
    getTrend: () => null as number | null,
  },
  {
    key: "income",
    label: "Total Income",
    icon: TrendingUp,
    colorClass: "text-income",
    bgClass: "bg-income/10",
    getValue: (d: ReturnType<typeof useInsights>) => d.totalIncome,
    getTrend: (d: ReturnType<typeof useInsights>) => d.incomeChange,
  },
  {
    key: "expenses",
    label: "Total Expenses",
    icon: TrendingDown,
    colorClass: "text-expense",
    bgClass: "bg-expense/10",
    getValue: (d: ReturnType<typeof useInsights>) => d.totalExpenses,
    getTrend: (d: ReturnType<typeof useInsights>) => d.expenseChange,
  },
  {
    key: "savings",
    label: "Savings Rate",
    icon: PiggyBank,
    colorClass: "text-savings",
    bgClass: "bg-savings/10",
    getValue: (d: ReturnType<typeof useInsights>) => d.savingsRate,
    getTrend: () => null as number | null,
    isSavings: true,
  },
];

export function SummaryCards() {
  const insights = useInsights();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const value = card.getValue(insights);
        const trend = card.getTrend(insights);
        const Icon = card.icon;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.bgClass}`}>
                    <Icon className={`h-4.5 w-4.5 ${card.colorClass}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold tracking-tight">
                  {card.isSavings ? `${value.toFixed(1)}%` : formatCurrency(value)}
                </div>
                {trend !== null && (
                  <p className={`text-xs mt-1 ${trend >= 0 ? "text-income" : "text-expense"}`}>
                    {formatPercent(trend)} vs last month
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
