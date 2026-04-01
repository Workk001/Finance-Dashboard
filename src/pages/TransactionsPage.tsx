import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useRole } from "@/hooks/useRole";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { EmptyState } from "@/components/common/EmptyState";
import { TableRowSkeleton } from "@/components/common/LoadingSkeleton";
import { Button } from "@/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/ui/tooltip";
import type { Transaction } from "@/types";

export function TransactionsPage() {
  const isLoading = useStore((s) => s.isLoading);
  const loadTransactions = useStore((s) => s.loadTransactions);
  const resetFilters = useStore((s) => s.resetFilters);
  const { canCreate, isViewer } = useRole();
  const { totalCount } = useFilteredTransactions();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleEdit = (transaction: Transaction) => {
    setEditing(transaction);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">All Transactions</h2>
          <p className="text-sm text-muted-foreground">Manage and explore your financial activity</p>
        </div>
        {canCreate ? (
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Transaction
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" disabled>
                <Plus className="h-4 w-4 mr-1" /> Add Transaction
              </Button>
            </TooltipTrigger>
            <TooltipContent>Switch to Admin to add transactions</TooltipContent>
          </Tooltip>
        )}
      </div>

      <TransactionFilters />

      {isLoading ? (
        <div className="space-y-1 rounded-lg border border-border overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      ) : totalCount === 0 ? (
        <EmptyState
          title="No transactions found"
          description="Try adjusting your filters or add a new transaction."
          action={
            isViewer
              ? { label: "Clear Filters", onClick: resetFilters }
              : { label: "Add Transaction", onClick: handleAdd }
          }
        />
      ) : (
        <TransactionTable onEdit={handleEdit} />
      )}

      <TransactionForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editingTransaction={editing}
      />
    </motion.div>
  );
}
