import { useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { InsightsPanel } from "@/components/insights/InsightsPanel";
import { DashboardSkeleton } from "@/components/common/LoadingSkeleton";

export function InsightsPage() {
  const isLoading = useStore((s) => s.isLoading);
  const transactions = useStore((s) => s.transactions);
  const loadTransactions = useStore((s) => s.loadTransactions);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  if (isLoading || transactions.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Financial Insights</h2>
        <p className="text-sm text-muted-foreground">Key observations and patterns from your financial data</p>
      </div>
      <InsightsPanel />
    </motion.div>
  );
}
