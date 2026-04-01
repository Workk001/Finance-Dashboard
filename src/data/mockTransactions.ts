import type { Transaction } from "@/types";

export const mockTransactions: Transaction[] = [
  // October 2025
  { id: "t01", date: "2025-10-01", description: "Monthly Salary", amount: 75000, type: "income", category: "salary" },
  { id: "t02", date: "2025-10-03", description: "Grocery Store - Big Bazaar", amount: 3200, type: "expense", category: "food" },
  { id: "t03", date: "2025-10-05", description: "Uber Rides", amount: 850, type: "expense", category: "transport" },
  { id: "t04", date: "2025-10-07", description: "Netflix Subscription", amount: 649, type: "expense", category: "entertainment" },
  { id: "t05", date: "2025-10-09", description: "Electricity Bill", amount: 2400, type: "expense", category: "bills" },
  { id: "t06", date: "2025-10-12", description: "Freelance Web Project", amount: 25000, type: "income", category: "freelance" },
  { id: "t07", date: "2025-10-14", description: "Zara - Clothing", amount: 4500, type: "expense", category: "shopping" },
  { id: "t08", date: "2025-10-18", description: "Doctor Consultation", amount: 1500, type: "expense", category: "health" },

  // November 2025
  { id: "t09", date: "2025-11-01", description: "Monthly Salary", amount: 75000, type: "income", category: "salary" },
  { id: "t10", date: "2025-11-02", description: "Swiggy Food Orders", amount: 2800, type: "expense", category: "food" },
  { id: "t11", date: "2025-11-04", description: "Metro Card Recharge", amount: 1000, type: "expense", category: "transport" },
  { id: "t12", date: "2025-11-06", description: "Amazon Shopping", amount: 6700, type: "expense", category: "shopping" },
  { id: "t13", date: "2025-11-10", description: "WiFi Bill", amount: 999, type: "expense", category: "bills" },
  { id: "t14", date: "2025-11-13", description: "Mutual Fund SIP", amount: 10000, type: "expense", category: "investment" },
  { id: "t15", date: "2025-11-15", description: "Freelance Mobile App UI", amount: 18000, type: "income", category: "freelance" },
  { id: "t16", date: "2025-11-20", description: "Gym Membership", amount: 2500, type: "expense", category: "health" },
  { id: "t17", date: "2025-11-22", description: "Udemy Course - React", amount: 499, type: "expense", category: "education" },
  { id: "t18", date: "2025-11-25", description: "Movie Tickets", amount: 800, type: "expense", category: "entertainment" },

  // December 2025
  { id: "t19", date: "2025-12-01", description: "Monthly Salary", amount: 75000, type: "income", category: "salary" },
  { id: "t20", date: "2025-12-03", description: "Restaurant Dinner", amount: 3500, type: "expense", category: "food" },
  { id: "t21", date: "2025-12-05", description: "Ola Rides", amount: 1200, type: "expense", category: "transport" },
  { id: "t22", date: "2025-12-08", description: "Flipkart Sale - Electronics", amount: 12000, type: "expense", category: "shopping" },
  { id: "t23", date: "2025-12-10", description: "Phone Bill", amount: 799, type: "expense", category: "bills" },
  { id: "t24", date: "2025-12-12", description: "Dividend Income", amount: 5000, type: "income", category: "investment" },
  { id: "t25", date: "2025-12-15", description: "Freelance Logo Design", amount: 8000, type: "income", category: "freelance" },
  { id: "t26", date: "2025-12-18", description: "Christmas Shopping", amount: 8500, type: "expense", category: "shopping" },
  { id: "t27", date: "2025-12-20", description: "Electricity Bill", amount: 2200, type: "expense", category: "bills" },
  { id: "t28", date: "2025-12-25", description: "Spotify Annual Plan", amount: 1189, type: "expense", category: "entertainment" },

  // January 2026
  { id: "t29", date: "2026-01-01", description: "Monthly Salary", amount: 78000, type: "income", category: "salary" },
  { id: "t30", date: "2026-01-03", description: "Grocery - DMart", amount: 4100, type: "expense", category: "food" },
  { id: "t31", date: "2026-01-05", description: "Cab to Airport", amount: 1800, type: "expense", category: "transport" },
  { id: "t32", date: "2026-01-08", description: "Myntra - Winter Wear", amount: 5200, type: "expense", category: "shopping" },
  { id: "t33", date: "2026-01-10", description: "Gas Bill", amount: 650, type: "expense", category: "bills" },
  { id: "t34", date: "2026-01-12", description: "Freelance Dashboard Project", amount: 30000, type: "income", category: "freelance" },
  { id: "t35", date: "2026-01-14", description: "Health Insurance Premium", amount: 5000, type: "expense", category: "health" },
  { id: "t36", date: "2026-01-18", description: "Coursera Subscription", amount: 3200, type: "expense", category: "education" },
  { id: "t37", date: "2026-01-20", description: "Zomato Orders", amount: 2600, type: "expense", category: "food" },
  { id: "t38", date: "2026-01-25", description: "Mutual Fund SIP", amount: 10000, type: "expense", category: "investment" },

  // February 2026
  { id: "t39", date: "2026-02-01", description: "Monthly Salary", amount: 78000, type: "income", category: "salary" },
  { id: "t40", date: "2026-02-03", description: "Supermarket Groceries", amount: 3800, type: "expense", category: "food" },
  { id: "t41", date: "2026-02-05", description: "Rapido Bike Rides", amount: 600, type: "expense", category: "transport" },
  { id: "t42", date: "2026-02-07", description: "Valentine's Day Gift", amount: 3500, type: "expense", category: "shopping" },
  { id: "t43", date: "2026-02-10", description: "WiFi + Phone Bundle", amount: 1499, type: "expense", category: "bills" },
  { id: "t44", date: "2026-02-12", description: "Freelance API Integration", amount: 15000, type: "income", category: "freelance" },
  { id: "t45", date: "2026-02-14", description: "Restaurant - Anniversary Dinner", amount: 4200, type: "expense", category: "food" },
  { id: "t46", date: "2026-02-17", description: "Eye Checkup", amount: 1200, type: "expense", category: "health" },
  { id: "t47", date: "2026-02-20", description: "Concert Tickets", amount: 3000, type: "expense", category: "entertainment" },
  { id: "t48", date: "2026-02-22", description: "Electricity Bill", amount: 1900, type: "expense", category: "bills" },
  { id: "t49", date: "2026-02-25", description: "Stock Dividend", amount: 3500, type: "income", category: "investment" },

  // March 2026
  { id: "t50", date: "2026-03-01", description: "Monthly Salary", amount: 80000, type: "income", category: "salary" },
  { id: "t51", date: "2026-03-02", description: "Zepto Quick Commerce", amount: 1800, type: "expense", category: "food" },
  { id: "t52", date: "2026-03-04", description: "Petrol Refill", amount: 2500, type: "expense", category: "transport" },
  { id: "t53", date: "2026-03-06", description: "Ajio Fashion Sale", amount: 4800, type: "expense", category: "shopping" },
  { id: "t54", date: "2026-03-08", description: "Water Bill", amount: 400, type: "expense", category: "bills" },
  { id: "t55", date: "2026-03-10", description: "Freelance SEO Audit", amount: 12000, type: "income", category: "freelance" },
  { id: "t56", date: "2026-03-12", description: "Gym Quarterly", amount: 6000, type: "expense", category: "health" },
  { id: "t57", date: "2026-03-14", description: "Udemy - Node.js Course", amount: 649, type: "expense", category: "education" },
  { id: "t58", date: "2026-03-16", description: "Swiggy Weekly Orders", amount: 3200, type: "expense", category: "food" },
  { id: "t59", date: "2026-03-18", description: "OTT Subscriptions Renewal", amount: 1500, type: "expense", category: "entertainment" },
  { id: "t60", date: "2026-03-20", description: "Mutual Fund SIP", amount: 10000, type: "expense", category: "investment" },
  { id: "t61", date: "2026-03-22", description: "Gas + Electricity", amount: 3100, type: "expense", category: "bills" },
  { id: "t62", date: "2026-03-25", description: "Freelance Consulting", amount: 20000, type: "income", category: "freelance" },
  { id: "t63", date: "2026-03-28", description: "Medical Tests", amount: 2500, type: "expense", category: "health" },
  { id: "t64", date: "2026-03-30", description: "Online Workshop - Design", amount: 1500, type: "expense", category: "education" },
];
