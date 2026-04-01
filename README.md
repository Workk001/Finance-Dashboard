# FinDash — Finance Dashboard

A clean, interactive finance dashboard built as a screening assignment for the **Frontend Developer Intern** position at **Zovryn FinTech**.

## Live Demo

> _Deploy URL will be added after Vercel deployment._

---

## Tech Stack & Justifications

| Technology | Why I Chose It |
|---|---|
| **React 18 + Vite** | Vite over CRA (deprecated) and Next.js (no SSR needed for a client-side dashboard). Right tool for the job. |
| **TypeScript (strict)** | Catches bugs at compile time, serves as living documentation. Discriminated unions enforce type correctness. |
| **Tailwind CSS v4** | Consistent UI without CSS specificity battles. Combined with custom theme tokens, gives a design system not just utilities. |
| **shadcn/ui (Radix UI)** | Components copied into project — I own every line. Accessible by default via Radix primitives. Fully customizable. |
| **Zustand** | Lighter than Redux (no boilerplate), better than Context (no unnecessary re-renders). Persist + devtools middleware built-in. |
| **Recharts** | React-native charting. Composes like React components. Chose over Tremor for lower-level customization control. |
| **Framer Motion** | Purpose-driven animations: page transitions, staggered card reveals. Every animation has a reason. |
| **React Router v6** | Proper client-side routing so each section has its own URL. |

---

## Features

### Core
- **Dashboard Overview** — 4 animated summary cards (balance, income, expenses, savings rate) with trend indicators, area chart for balance trend, interactive donut chart for spending breakdown
- **Transactions** — Sortable data table, debounced search, multi-filter (category, type, date range), pagination (10/25/50), mobile card view
- **Role-Based UI** — Admin/Viewer switcher. Admin gets full CRUD. Viewer sees disabled states with tooltips (intentional: users should know features exist but are restricted)
- **Insights** — Highest spending category, monthly income vs expenses comparison, expense change %, average transaction, most active day, savings trend
- **State Management** — Zustand with persist (localStorage) + devtools middleware. Custom hooks for derived data.

### Optional Enhancements (all implemented)
- Dark mode with system preference detection
- Data persistence via localStorage (survives refresh)
- Mock API service layer with simulated loading delays
- Framer Motion animations (page transitions, staggered cards, modal springs)
- CSV/JSON export of filtered transactions
- Advanced filtering with active filter badges and clear-all

---

## Architecture

```
src/
  components/
    layout/          — Sidebar, Header, MobileNav, Layout
    dashboard/       — SummaryCards, BalanceTrendChart, SpendingBreakdownChart
    transactions/    — TransactionTable, TransactionFilters, TransactionForm
    insights/        — InsightsPanel, InsightCard
    common/          — EmptyState, LoadingSkeleton, ErrorBoundary
  ui/                — shadcn/ui primitives (Button, Card, Dialog, Badge, etc.)
  hooks/
    useRole.ts                 — Permission checking hook
    useFilteredTransactions.ts — Memoized filtered + sorted transactions
    useInsights.ts             — Computed insights from transaction data
    useMediaQuery.ts           — Responsive breakpoint detection
  services/
    transactionService.ts      — Async mock API layer
  store/
    useStore.ts                — Zustand store with persist + devtools
  data/                        — Mock transactions + category definitions
  types/                       — TypeScript type definitions
  lib/                         — Utility functions (cn, formatCurrency, export)
  pages/                       — Route-level page components
```

### Key Architectural Decisions

1. **Feature-based organization** — Each feature is self-contained and easy to navigate
2. **Custom hooks for business logic** — Components handle rendering, hooks handle computation. `useFilteredTransactions()` and `useInsights()` are memoized with `useMemo`
3. **Service layer abstraction** — Even for mock data, `transactionService.ts` uses async functions. Swapping to a real API means changing one file
4. **Disabled states over hidden elements** — Viewer role shows disabled buttons with tooltips instead of hiding them. Real products communicate restrictions rather than hiding capabilities

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone <repo-url>
cd finance-dashboard
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## What I'd Improve With More Time

- Unit tests with Vitest + React Testing Library
- Virtual scrolling for large transaction lists (TanStack Virtual)
- Budget feature — set category spending limits with visual progress bars
- Notifications system for budget alerts
- More granular RBAC (e.g., Manager role that can view but not delete)
- E2E tests with Playwright

---

## Assignment Reference

- **Position**: Frontend Developer Intern at Zovryn FinTech
- **Reference ID**: TE8LH2I0
