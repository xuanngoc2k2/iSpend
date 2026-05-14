"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { useTransactionStore } from "@/store/transactionStore";
import { ArrowUpRight, ArrowDownLeft, Settings, Eye, User as UserIcon, Plus, Loader2, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { ExpenseCalendar } from "@/components/ExpenseCalendar";
import Link from "next/link";
import { format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";

export default function Home() {
  const { user } = useAuthStore();
  const { transactions, loading, fetchTransactions } = useTransactionStore();
  const [viewType, setViewType] = useState<"day" | "month">("day");
  const [activeWallet, setActiveWallet] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user, fetchTransactions]);

  const WALLETS = ["Tất cả", "Wallet", "Bank"];

  const filteredByDate = transactions.filter(t => isSameDay(new Date(t.date), selectedDate));

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="p-6 space-y-8 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-ios-gray text-sm">Chào buổi sáng ☀️</p>
          <h2 className="text-2xl font-bold tracking-tight">
            {user?.email?.split("@")[0] || "Người dùng"}
          </h2>
          <div className="mt-1 bg-white/5 border border-white/10 rounded-full px-3 py-0.5 text-[10px] inline-flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${transactions.length > 0 ? "bg-ios-green" : "bg-ios-yellow animate-pulse"}`} />
            {transactions.length > 0 ? `Đã có ${transactions.length} giao dịch` : "Hôm nay chưa chi tiêu"}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden"
        >
          <UserIcon className="w-6 h-6 text-ios-gray" />
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileTap={{ scale: 0.98 }} className="glass-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <div className="w-8 h-8 bg-ios-red/20 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-ios-red" />
            </div>
          </div>
          <p className="text-ios-gray text-xs mb-1 font-medium uppercase tracking-wider">Chi</p>
          <p className="text-xl font-bold">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `${(totalExpense / 1000).toFixed(1)}k`}
          </p>
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }} className="glass-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <div className="w-8 h-8 bg-ios-green/20 rounded-full flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4 text-ios-green" />
            </div>
          </div>
          <p className="text-ios-gray text-xs mb-1 font-medium uppercase tracking-wider">Thu</p>
          <p className="text-xl font-bold">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `${(totalIncome / 1000).toFixed(1)}k`}
          </p>
        </motion.div>
      </div>

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ExpenseCalendar 
          transactions={transactions}
          onDateSelect={(date) => setSelectedDate(date)} 
        />
      </motion.div>

      {/* Transaction List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Giao dịch</h3>
          <span className="text-[10px] text-ios-gray uppercase font-bold tracking-widest">
            {format(selectedDate, "dd MMMM", { locale: vi })}
          </span>
        </div>
        
        <div className="space-y-3">
          {filteredByDate.length > 0 ? (
            filteredByDate.map((t) => (
              <motion.div
                key={t.id}
                layoutId={t.id}
                className="glass-card p-4 flex items-center justify-between group active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl relative overflow-hidden">
                    {(t as any).categories?.icon || "✨"}
                    {t.image_url && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold">{(t as any).categories?.name || "Khác"}</p>
                    <p className="text-xs text-ios-gray truncate max-w-[150px]">{t.note || "Không có ghi chú"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${t.type === "expense" ? "text-ios-red" : "text-ios-green"}`}>
                    {t.type === "expense" ? "-" : "+"}{Number(t.amount).toLocaleString("vi-VN")}đ
                  </p>
                  <p className="text-[10px] text-ios-gray">{format(new Date(t.date), "HH:mm")}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-10 text-center glass-card border-dashed">
              <p className="text-ios-gray text-sm italic">Chưa có giao dịch nào trong ngày này</p>
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <Link href="/add-expense">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-28 right-6 w-16 h-16 bg-ios-blue rounded-full shadow-2xl flex items-center justify-center text-white z-40"
        >
          <Plus className="w-8 h-8" />
        </motion.button>
      </Link>

      <div className="h-10" />
    </div>
  );
}
