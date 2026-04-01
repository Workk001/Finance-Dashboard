import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import { useInsights } from "@/hooks/useInsights";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import type { Category } from "@/types";

interface PayloadEntry {
  name: string;
  value: number;
  payload: { category: Category; label: string; color: string; amount: number; percentage: number };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: PayloadEntry[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{d.label}</p>
      <p className="text-sm font-semibold">{formatCurrency(d.amount)}</p>
      <p className="text-xs text-muted-foreground">{d.percentage.toFixed(1)}% of total</p>
    </div>
  );
}

export function SpendingBreakdownChart() {
  const { categoryBreakdown, totalExpenses } = useInsights();
  const navigate = useNavigate();
  const setFilters = useStore((s) => s.setFilters);

  const handleClick = (category: Category) => {
    setFilters({ categories: [category], type: "expense" });
    navigate("/transactions");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative">
            <ResponsiveContainer width={240} height={240}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="amount"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  cursor="pointer"
                  onClick={(_, index) => handleClick(categoryBreakdown[index].category)}
                >
                  {categoryBreakdown.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold">{formatCurrency(totalExpenses)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full max-w-xs">
            {categoryBreakdown.slice(0, 6).map((item) => (
              <button
                key={item.category}
                onClick={() => handleClick(item.category)}
                className="flex items-center gap-2 text-left text-sm hover:opacity-70 transition-opacity"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
