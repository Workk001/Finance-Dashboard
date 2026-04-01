import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useRole } from "@/hooks/useRole";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { CATEGORIES } from "@/data/categories";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction, FilterState } from "@/types";

interface TransactionTableProps {
  onEdit: (transaction: Transaction) => void;
}

export function TransactionTable({ onEdit }: TransactionTableProps) {
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const { paginated, totalPages, totalCount } = useFilteredTransactions();
  const { canEdit, canDelete, isViewer } = useRole();
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteTransaction(deleteTarget.id);
    toast.success("Transaction deleted", {
      description: `"${deleteTarget.description}" has been removed.`,
    });
    setDeleteTarget(null);
  };

  const handleSort = (key: FilterState["sortBy"]) => {
    if (filters.sortBy === key) {
      setFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc", page: 1 });
    } else {
      setFilters({ sortBy: key, sortOrder: "desc", page: 1 });
    }
  };

  const SortHeader = ({ label, sortKey }: { label: string; sortKey: FilterState["sortBy"] }) => (
    <button
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
      onClick={() => handleSort(sortKey)}
    >
      {label}
      <ArrowUpDown className={`h-3 w-3 ${filters.sortBy === sortKey ? "text-primary" : ""}`} />
    </button>
  );

  return (
    <div>
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3"><SortHeader label="Date" sortKey="date" /></th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
              <th className="text-left p-3"><SortHeader label="Category" sortKey="category" /></th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="text-right p-3"><SortHeader label="Amount" sortKey="amount" /></th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((t) => {
              const cat = CATEGORIES[t.category];
              return (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-sm text-muted-foreground whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="p-3 text-sm font-medium">{t.description}</td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs font-normal" style={{ borderColor: cat.color, color: cat.color }}>
                      {cat.label}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant={t.type === "income" ? "income" : "expense"} className="text-xs capitalize">
                      {t.type}
                    </Badge>
                  </td>
                  <td className={`p-3 text-sm font-semibold text-right tabular-nums ${t.type === "income" ? "text-income" : "text-expense"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {canEdit ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(t)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Switch to Admin to edit</TooltipContent>
                        </Tooltip>
                      )}
                      {canDelete ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(t)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Switch to Admin to delete</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {paginated.map((t) => {
          const cat = CATEGORIES[t.category];
          return (
            <div key={t.id} className="rounded-lg border border-border bg-card p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(t.date)}</p>
                </div>
                <span className={`text-sm font-semibold tabular-nums ${t.type === "income" ? "text-income" : "text-expense"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-normal" style={{ borderColor: cat.color, color: cat.color }}>
                  {cat.label}
                </Badge>
                <Badge variant={t.type === "income" ? "income" : "expense"} className="text-xs capitalize">
                  {t.type}
                </Badge>
              </div>
              {canEdit && (
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => onEdit(t)}>
                    <Pencil className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-7 text-destructive" onClick={() => setDeleteTarget(t)}>
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              )}
              {isViewer && (
                <p className="text-xs text-muted-foreground italic pt-1">Switch to Admin to manage transactions</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-border gap-3">
          <p className="text-sm text-muted-foreground">
            Showing {((filters.page - 1) * filters.pageSize) + 1}–{Math.min(filters.page * filters.pageSize, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <Select
              value={String(filters.pageSize)}
              onValueChange={(v) => setFilters({ pageSize: Number(v), page: 1 })}
            >
              <SelectTrigger className="w-[80px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              disabled={filters.page <= 1}
              onClick={() => setFilters({ page: filters.page - 1 })}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {filters.page} / {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={filters.page >= totalPages}
              onClick={() => setFilters({ page: filters.page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.description}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
