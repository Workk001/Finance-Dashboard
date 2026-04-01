import { mockTransactions } from "@/data/mockTransactions";
import type { Transaction } from "@/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await delay(800);
  return [...mockTransactions];
}

export async function createTransaction(
  data: Omit<Transaction, "id">
): Promise<Transaction> {
  await delay(400);
  return { ...data, id: `t${Date.now()}` };
}

export async function updateTransaction(
  id: string,
  data: Partial<Omit<Transaction, "id">>
): Promise<Transaction> {
  await delay(400);
  const existing = mockTransactions.find((t) => t.id === id);
  if (!existing) throw new Error(`Transaction ${id} not found`);
  return { ...existing, ...data };
}

export async function deleteTransaction(id: string): Promise<void> {
  await delay(300);
  const exists = mockTransactions.some((t) => t.id === id);
  if (!exists) throw new Error(`Transaction ${id} not found`);
}
