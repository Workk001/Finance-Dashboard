import { useEffect, useState } from "react";
import { Search, X, SlidersHorizontal, Download } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { CATEGORIES } from "@/data/categories";
import type { Category, TransactionType } from "@/types";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import { exportToCSV, exportToJSON } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/ui/dropdown-menu";

export function TransactionFilters() {
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const resetFilters = useStore((s) => s.resetFilters);
  const { filtered } = useFilteredTransactions();
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchInput });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, setFilters]);

  const activeFilterCount =
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.type !== "all" ? 1 : 0) +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0);

  const handleExport = (format: "csv" | "json") => {
    const data = filtered.map((t) => ({
      Date: t.date,
      Description: t.description,
      Category: CATEGORIES[t.category].label,
      Type: t.type,
      Amount: t.amount,
    }));
    if (format === "csv") exportToCSV(data, "transactions");
    else exportToJSON(data, "transactions");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select
          value={filters.type}
          onValueChange={(v) => setFilters({ type: v as TransactionType | "all" })}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.categories.length === 1 ? filters.categories[0] : "all"}
          onValueChange={(v) =>
            setFilters({ categories: v === "all" ? [] : [v as Category] })
          }
        >
          <SelectTrigger className="w-full sm:w-[170px]">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.values(CATEGORIES).map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ dateFrom: e.target.value })}
            className="w-full sm:w-[150px]"
          />
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ dateTo: e.target.value })}
            className="w-full sm:w-[150px]"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("csv")}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("json")}>
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {filters.type !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs">
              {filters.type}
              <button onClick={() => setFilters({ type: "all" })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="gap-1 text-xs">
              {CATEGORIES[cat].label}
              <button
                onClick={() =>
                  setFilters({ categories: filters.categories.filter((c) => c !== cat) })
                }
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {(filters.dateFrom || filters.dateTo) && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Date range
              <button onClick={() => setFilters({ dateFrom: "", dateTo: "" })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-6">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
