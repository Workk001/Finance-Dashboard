import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/ui/tooltip";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Layout } from "@/components/layout/Layout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { InsightsPage } from "@/pages/InsightsPage";

export function App() {
  return (
    <TooltipProvider delayDuration={300}>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="insights" element={<InsightsPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </TooltipProvider>
  );
}
