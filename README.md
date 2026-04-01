# FinDash

A finance dashboard for tracking income, expenses, and spending patterns. Built with React, TypeScript, and Tailwind CSS as a screening assignment for the Frontend Developer Intern role at Zovryn FinTech.

**Live Demo** -- _deploy URL will be added after Vercel deployment_

---

## Overview

FinDash is a single-page application that simulates a personal finance tracker. Users can view aggregated financial summaries, explore individual transactions with filtering and sorting, switch between Admin and Viewer roles, and review dynamically computed insights -- all from a responsive, theme-aware interface.

The project is intentionally frontend-only. Data lives in a Zustand store, persisted to localStorage, and loaded through a service layer that simulates async API calls with network delays. This means the architecture is ready for a real backend without restructuring.

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 19 + Vite 8 | Vite over Next.js: no SSR needed for a client-side dashboard. Fast HMR, modern defaults. |
| Language | TypeScript 5.9 (strict) | Strict mode catches bugs at compile time. Union types enforce valid categories and roles. |
| Styling | Tailwind CSS 4 | Utility-first with custom design tokens. Dark mode via `@custom-variant`. No runtime CSS-in-JS. |
| UI Primitives | Radix UI + shadcn-style components | Accessible by default (keyboard, screen reader). Components are copied into the project, not imported from a library -- fully owned and customizable. |
| State | Zustand 5 | Minimal API, no boilerplate. `persist` middleware for localStorage. `devtools` middleware for Redux DevTools inspection. |
| Charts | Recharts 3 | Composable React components for Area, Pie, and Bar charts with custom tooltips and gradients. |
| Routing | React Router 7 | Each section has its own URL. Layout wrapper with nested routes. |
| Animation | Framer Motion 12 | Staggered card entrances, page fade-ins, spring-based mobile nav drawer. |
| Icons | Lucide React | Consistent line-icon set. Tree-shakeable -- only used icons are bundled. |

---

## Features

### Dashboard

Summary cards for Total Balance, Income, Expenses, and Savings Rate. Each card includes currency formatting (INR via `Intl.NumberFormat`), a trend indicator comparing the current month to the previous month, and a staggered entrance animation. Below the cards, two charts:

- **Balance Trend** -- gradient-filled area chart showing cumulative monthly balance over time, with a custom hover tooltip.
- **Spending Breakdown** -- interactive donut chart grouped by expense category. Clicking a category navigates to the Transactions page with that category pre-filtered. Center label displays total expenses. Legend matches the color system used throughout the app.

### Transactions

A full data table on desktop that transforms into stacked cards on mobile. Includes:

- **Debounced search** (300ms) across description and category fields
- **Multi-filter** -- category dropdown, income/expense type toggle, date range pickers
- **Sortable columns** -- click any header (Date, Category, Amount) to toggle ascending/descending
- **Pagination** -- configurable page size (10, 25, 50) with page navigation
- **Active filter badges** -- visible indicators for each applied filter with individual clear buttons and a "Clear all" action
- **Export** -- download the current filtered view as CSV or JSON via dropdown menu

### Role-Based UI

A dropdown in the header switches between Admin and Viewer. The role state drives conditional rendering throughout the app:

- **Admin** -- full CRUD. "Add Transaction" button in the page header. Edit and delete icons on every row. Add/edit opens a Dialog with form validation (required fields, positive amount).
- **Viewer** -- action buttons are rendered but disabled, with tooltips explaining the restriction ("Switch to Admin to edit"). This is a deliberate design choice: users should understand what the product offers, not be confused by missing UI. Disabled states communicate restrictions more clearly than hidden elements.

Permissions are encapsulated in a `useRole()` hook that returns `{ canCreate, canEdit, canDelete, isAdmin, isViewer }`. Components consume this hook, keeping permission logic out of rendering code.

### Insights

Six computed insight cards and a grouped bar chart, all derived dynamically from the transaction data:

- Highest spending category with percentage of total expenses
- Month-over-month expense change
- Average transaction size across all records
- Most active transaction day of the week
- Savings trend (improving, declining, or stable based on recent months)
- Overall savings rate with total saved amount

The bar chart compares monthly income vs. expenses side by side.

### Dark Mode

Full light and dark themes with distinct color palettes (not just inverted). Theme is persisted to localStorage and restored on page load, including applying the `dark` class to the document root during rehydration.

### Data Persistence

All transactions, theme preference, and role selection survive page refreshes via Zustand's `persist` middleware writing to localStorage under the `findash-storage` key.

---

## Architecture

```
src/
  pages/                       Route-level components rendered by React Router
  components/
    layout/                    Sidebar, Header, MobileNav, Layout shell
    dashboard/                 SummaryCards, BalanceTrendChart, SpendingBreakdownChart
    transactions/              TransactionTable, TransactionFilters, TransactionForm
    insights/                  InsightsPanel, InsightCard
    common/                    EmptyState, LoadingSkeleton, ErrorBoundary
  ui/                          Radix-based primitives (Button, Card, Dialog, Badge, etc.)
  hooks/                       useRole, useFilteredTransactions, useInsights, useMediaQuery
  store/                       Zustand store with persist + devtools
  services/                    Async mock API layer
  data/                        Mock transactions and category definitions
  types/                       TypeScript type definitions
  lib/                         Utility functions (cn, formatCurrency, export helpers)
```

### Design Decisions

**Feature-based file structure.** Components, hooks, and types are organized by feature, not by file type. Each feature directory is self-contained and navigable without cross-referencing.

**Custom hooks for derived state.** `useFilteredTransactions()` applies search, category, type, and date filters, sorts by the selected column, and paginates -- all memoized. `useInsights()` computes totals, category breakdowns, monthly aggregations, savings trends, and balance history from raw transactions. Business logic stays out of components.

**Service layer abstraction.** `transactionService.ts` provides async functions (`fetchTransactions`, `createTransaction`, `updateTransaction`, `deleteTransaction`) with simulated network delays. The store currently uses mock data directly, but swapping to real HTTP calls means changing one file.

**Skeleton loading states.** The dashboard and transaction list show shimmer placeholders while data loads, simulating an 800ms fetch. This is not decorative -- it demonstrates awareness of perceived performance and async UI patterns.

**Empty states.** When filters return no results, a dedicated `EmptyState` component renders with a contextual message and an action button (either "Clear Filters" or "Add Transaction" depending on role).

**Error boundary.** A class-based `ErrorBoundary` wraps the entire app and catches rendering errors with a recovery UI.

---

## Design System

The project uses a token-based color system defined in CSS custom properties and consumed through Tailwind:

- **Semantic colors** -- `background`, `foreground`, `card`, `muted`, `primary`, `destructive`, `border`
- **Financial colors** -- `income` (green), `expense` (red), `balance` (indigo), `savings` (violet)
- **Chart palette** -- five distinct colors mapped to `chart-1` through `chart-5`
- **Category colors** -- 11 categories, each with a unique hex value used consistently in badges, chart slices, and legends

Typography uses Inter loaded from Google Fonts, with a fallback to the system sans-serif stack. The layout follows a consistent 4px spacing grid via Tailwind utility classes.

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Install and Run

```bash
cd finance-dashboard
npm install
npm run dev
```

Opens at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## What I Would Improve

- **Testing** -- unit tests with Vitest and React Testing Library, particularly for `useFilteredTransactions` and `useInsights` hooks
- **Virtual scrolling** -- TanStack Virtual for transaction lists exceeding a few hundred rows
- **Budget tracking** -- allow users to set spending limits per category with visual progress indicators
- **Granular roles** -- a Manager role with read-only access to admin-level analytics
- **End-to-end tests** -- Playwright for critical flows (add transaction, filter, role switch)
