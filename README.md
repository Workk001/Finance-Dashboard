# FinDash

A finance dashboard for tracking income, expenses, and spending patterns. Built as a screening assignment for the Frontend Developer Intern role at Zorvyn FinTech.

**Live Demo** -- _deploy URL will be added after Vercel deployment_

---

## Overview

FinDash is a single-page application that simulates a personal finance tracker. Users can view financial summaries, explore transactions with filtering and sorting, switch between Admin and Viewer roles, and review dynamically computed insights -- all from a responsive, theme-aware interface.

Data lives in a Zustand store persisted to localStorage. A service layer simulates async API calls with network delays, so the architecture is ready for a real backend without restructuring.

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 19 + Vite 8 | Vite over Next.js -- no SSR needed for a client-side dashboard |
| Language | TypeScript 5.9 (strict) | Catches bugs at compile time. Union types enforce valid categories and roles |
| Styling | Tailwind CSS 4 | Utility-first with custom design tokens. Dark mode via class strategy |
| UI Primitives | Radix UI + shadcn-style | Accessible by default. Components copied into project -- fully owned and customizable |
| State | Zustand 5 | Minimal API. `persist` for localStorage, `devtools` for Redux DevTools |
| Charts | Recharts 3 | Composable React components for Area, Pie, and Bar charts |
| Routing | React Router 7 | Each section has its own URL with nested layout routes |
| Animation | Framer Motion 12 | Staggered card entrances, page transitions, spring-based mobile drawer |
| Icons | Lucide React | Consistent icon set. Tree-shakeable |
| Notifications | Sonner | Lightweight toast notifications for CRUD feedback |

---

## Features

### Dashboard

Four summary cards showing Total Balance, Income, Expenses, and Savings Rate. Each card displays a month-over-month trend indicator. Below the cards:

- **Balance Trend** -- gradient-filled area chart showing cumulative monthly balance with a custom tooltip
- **Spending Breakdown** -- interactive donut chart by expense category. Clicking a slice navigates to the Transactions page with that category pre-filtered
- **Recent Activity** -- the five latest transactions with a link to the full list

### Transactions

A sortable data table on desktop that transforms into stacked cards on mobile.

- Debounced search (300ms) across description and category
- Multi-filter -- category, income/expense type, date range
- Sortable columns -- Date, Category, Amount (ascending/descending)
- Pagination with configurable page size (10, 25, 50)
- Active filter badges with individual remove and "Clear all"
- CSV and JSON export of the current filtered view

### Role-Based UI

A dropdown in the header switches between Admin and Viewer.

- **Admin** -- full CRUD. Add/edit via modal with form validation. Delete with confirmation dialog. Toast notifications on every action.
- **Viewer** -- action buttons are disabled with tooltips ("Switch to Admin to edit"), not hidden. This is deliberate: disabled states communicate restrictions more clearly than missing elements.

Permissions are encapsulated in a `useRole()` hook returning `{ canCreate, canEdit, canDelete }`. Components consume this hook, keeping permission logic centralized.

### Insights

Six computed metrics and a grouped bar chart, all derived dynamically from the transaction data:

- Highest spending category with percentage of total expenses
- Month-over-month expense change
- Average transaction size
- Most active transaction day of the week
- Savings trend (improving, declining, or stable)
- Overall savings rate with total saved

### Additional

- **Dark mode** -- full light and dark themes with separate color palettes, persisted to localStorage
- **Data persistence** -- transactions, theme, and role survive page refreshes
- **Loading states** -- skeleton placeholders matching actual layout shapes
- **Empty states** -- contextual messages with role-aware action buttons
- **Error boundary** -- catches rendering errors with recovery UI
- **404 page** -- handles invalid routes

---

## Architecture

```
src/
  pages/               Route-level components (Dashboard, Transactions, Insights, 404)
  components/
    layout/            Sidebar, Header, MobileNav, Layout shell
    dashboard/         SummaryCards, BalanceTrendChart, SpendingBreakdownChart, RecentTransactions
    transactions/      TransactionTable, TransactionFilters, TransactionForm
    insights/          InsightsPanel, InsightCard
    common/            EmptyState, LoadingSkeleton, ErrorBoundary
  ui/                  Radix-based primitives (Button, Card, Dialog, Badge, Select, etc.)
  hooks/               useRole, useFilteredTransactions, useInsights, useMediaQuery
  store/               Zustand store with persist + devtools
  services/            Async mock API layer
  data/                Mock transactions and category definitions
  types/               TypeScript type definitions
  lib/                 Utility functions (cn, formatCurrency, export helpers)
```

### Design Decisions

**Feature-based structure.** Components organized by feature, not file type. Each directory is self-contained.

**Custom hooks for derived state.** `useFilteredTransactions()` handles search, filter, sort, and pagination -- all memoized. `useInsights()` computes 14 derived values from raw transactions. Business logic stays out of components.

**Service layer.** `transactionService.ts` provides async functions with simulated delays. Swapping to a real API means changing one file.

**Disabled over hidden.** Viewer role sees disabled buttons with tooltips instead of hidden elements. Real products communicate restrictions rather than hiding capabilities.

---

## Design System

Token-based colors defined in CSS custom properties, consumed through Tailwind:

- **Semantic** -- background, foreground, card, muted, primary, destructive, border
- **Financial** -- income (green), expense (red), balance (indigo), savings (violet)
- **Charts** -- five distinct colors for chart-1 through chart-5
- **Categories** -- 11 unique colors used consistently in badges, chart slices, and legends

Typography uses Inter with a system sans-serif fallback. Layout follows a consistent 4px spacing grid.

---

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

```bash
cd finance-dashboard
npm install
npm run dev
```

Opens at `http://localhost:5173`.

**Production build:**

```bash
npm run build
npm run preview
```

---

## What I Would Improve

- **Testing** -- Vitest + React Testing Library for `useFilteredTransactions` and `useInsights` hooks
- **Virtual scrolling** -- TanStack Virtual for large transaction lists
- **Budget tracking** -- spending limits per category with visual progress indicators
- **Granular roles** -- Manager role with read-only access to admin analytics
- **E2E tests** -- Playwright for critical user flows
