import { create } from "zustand";
import { Transaction, transactionService } from "@/services/transactionService";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loading: false,
  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const data = await transactionService.getAll();
      set({ transactions: data as any, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  addTransaction: async (transaction) => {
    try {
      await transactionService.create(transaction);
      get().fetchTransactions();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));
