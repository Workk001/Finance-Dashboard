import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, PiggyBank, Hash, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import { InsightCard } from "./InsightCard";
import { useInsights } from "@/hooks/useInsights";
import { formatCurrency } from "@/lib/utils";

function formatMonth(month: string) {
  const [y, m] = month.split("-");
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleDateString("en", { month: "short" });
}

interface PayloadEntry {
  name: string;
  value: number;
  payload: { month: string; income: number; expenses: number };
  color: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: PayloadEntry[]; label?: string }) {
  if (!active || !payload?.length || !label) return null;
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-md space-y-1">
      <p className="text-xs font-medium">{formatMonth(label)}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function InsightsPanel() {
  const insights = useInsights();

  const savingsTrendLabel =
    insights.savingsTrend === "improving"
      ? "Your savings trend is improving"
      : insights.savingsTrend === "declining"
        ? "Your savings trend is declining"
        : "Your savings trend is stable";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InsightCard
          title="Highest Spending"
          value={insights.highestSpendingCategory ? insights.highestSpendingCategory.label : "N/A"}
          subtitle={
            insights.highestSpendingCategory
              ? `${formatCurrency(insights.highestSpendingCategory.amount)} (${insights.highestSpendingCategory.percentage.toFixed(1)}% of expenses)`
              : undefined
          }
          icon={<TrendingUp className="h-5 w-5" />}
          colorClass="text-expense"
          index={0}
        />
        <InsightCard
          title="Expense Change"
          value={`${insights.expenseChange >= 0 ? "+" : ""}${insights.expenseChange.toFixed(1)}%`}
          subtitle="Compared to last month"
          icon={insights.expenseChange >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
          colorClass={insights.expenseChange >= 0 ? "text-expense" : "text-income"}
          index={1}
        />
        <InsightCard
          title="Average Transaction"
          value={formatCurrency(insights.avgTransaction)}
          subtitle={`Across ${insights.transactionCount} transactions`}
          icon={<Hash className="h-5 w-5" />}
          colorClass="text-primary"
          index={2}
        />
        <InsightCard
          title="Most Active Day"
          value={insights.mostActiveDay}
          subtitle="Day with most transactions"
          icon={<Calendar className="h-5 w-5" />}
          colorClass="text-chart-3"
          index={3}
        />
        <InsightCard
          title="Savings Trend"
          value={insights.savingsTrend.charAt(0).toUpperCase() + insights.savingsTrend.slice(1)}
          subtitle={savingsTrendLabel}
          icon={<PiggyBank className="h-5 w-5" />}
          colorClass="text-savings"
          index={4}
        />
        <InsightCard
          title="Savings Rate"
          value={`${insights.savingsRate.toFixed(1)}%`}
          subtitle={`${formatCurrency(insights.totalIncome - insights.totalExpenses)} saved total`}
          icon={<TrendingUp className="h-5 w-5" />}
          colorClass="text-income"
          index={5}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={insights.monthlyData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonth}
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              />
              <Bar dataKey="income" name="Income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
