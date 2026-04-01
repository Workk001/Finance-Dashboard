import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/ui/tooltip";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Layout } from "@/components/layout/Layout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { useStore } from "@/store/useStore";

export function App() {
  const theme = useStore((s) => s.theme);

  return (
    <TooltipProvider delayDuration={300}>
      <ErrorBoundary>
        <Toaster
          theme={theme}
          position="bottom-right"
          toastOptions={{
            className: "border border-border",
          }}
        />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </TooltipProvider>
  );
}
