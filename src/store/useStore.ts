import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Transaction, TransactionInput, FilterState, Role, Theme } from "@/types";
import { mockTransactions } from "@/data/mockTransactions";

interface AppState {
  transactions: Transaction[];
  isLoading: boolean;
  filters: FilterState;
  role: Role;
  theme: Theme;
  sidebarOpen: boolean;

  loadTransactions: () => Promise<void>;
  addTransaction: (data: TransactionInput) => void;
  updateTransaction: (id: string, data: Partial<TransactionInput>) => void;
  deleteTransaction: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setRole: (role: Role) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  search: "",
  categories: [],
  type: "all",
  dateFrom: "",
  dateTo: "",
  sortBy: "date",
  sortOrder: "desc",
  page: 1,
  pageSize: 10,
};

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],
        isLoading: false,
        filters: DEFAULT_FILTERS,
        role: "admin",
        theme: "light",
        sidebarOpen: true,

        loadTransactions: async () => {
          if (get().transactions.length > 0) return;
          set({ isLoading: true });
          await new Promise((r) => setTimeout(r, 800));
          set({ transactions: [...mockTransactions], isLoading: false });
        },

        addTransaction: (data) => {
          const newTransaction: Transaction = {
            ...data,
            id: `t${Date.now()}`,
          };
          set((state) => ({
            transactions: [newTransaction, ...state.transactions],
          }));
        },

        updateTransaction: (id, data) => {
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === id ? { ...t, ...data } : t
            ),
          }));
        },

        deleteTransaction: (id) => {
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          }));
        },

        setFilters: (newFilters) => {
          set((state) => ({
            filters: { ...state.filters, ...newFilters, page: newFilters.page ?? 1 },
          }));
        },

        resetFilters: () => {
          set({ filters: DEFAULT_FILTERS });
        },

        setRole: (role) => set({ role }),

        toggleTheme: () => {
          const newTheme = get().theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle("dark", newTheme === "dark");
          set({ theme: newTheme });
        },

        toggleSidebar: () => {
          set((state) => ({ sidebarOpen: !state.sidebarOpen }));
        },
      }),
      {
        name: "findash-storage",
        partialize: (state) => ({
          transactions: state.transactions,
          theme: state.theme,
          role: state.role,
        }),
        onRehydrateStorage: () => (state) => {
          if (state?.theme === "dark") {
            document.documentElement.classList.add("dark");
          }
        },
      }
    ),
    { name: "FinDash" }
  )
);
