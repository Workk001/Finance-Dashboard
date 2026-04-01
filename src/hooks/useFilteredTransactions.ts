import { useMemo } from "react";
import { useStore } from "@/store/useStore";

export function useFilteredTransactions() {
  const transactions = useStore((s) => s.transactions);
  const filters = useStore((s) => s.filters);

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((t) => filters.categories.includes(t.category));
    }

    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.dateFrom) {
      result = result.filter((t) => t.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter((t) => t.date <= filters.dateTo);
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (filters.sortBy) {
        case "date":
          cmp = a.date.localeCompare(b.date);
          break;
        case "amount":
          cmp = a.amount - b.amount;
          break;
        case "category":
          cmp = a.category.localeCompare(b.category);
          break;
      }
      return filters.sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [transactions, filters]);

  const paginated = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize;
    return filtered.slice(start, start + filters.pageSize);
  }, [filtered, filters.page, filters.pageSize]);

  const totalPages = Math.ceil(filtered.length / filters.pageSize);

  return { filtered, paginated, totalPages, totalCount: filtered.length };
}
