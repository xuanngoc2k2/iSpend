"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTransactionStore } from "@/store/transactionStore";
import { ChevronLeft, ChevronRight, PieChart } from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isSameMonth } from "date-fns";
import { vi } from "date-fns/locale";

export default function StatisticsPage() {
  const { transactions, fetchTransactions, loading } = useTransactionStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const filteredTransactions = transactions.filter(t => 
    isSameMonth(new Date(t.date), currentMonth) && t.type === "expense"
  );

  const totalExpense = filteredTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

  // Group by category
  const categoryDataMap = filteredTransactions.reduce((acc, t) => {
    const catName = (t as any).categories?.name || "Khác";
    const catColor = (t as any).categories?.color || "#8E8E93";
    const catIcon = (t as any).categories?.icon || "✨";
    
    if (!acc[catName]) {
      acc[catName] = { name: catName, value: 0, color: catColor, icon: catIcon };
    }
    acc[catName].value += Number(t.amount);
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(categoryDataMap);

  return (
    <div className="p-6 space-y-8 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Thống kê</h1>
        <div className="bg-white/5 p-1 rounded-full flex gap-1">
          {["Tháng", "Năm"].map((t) => (
            <button
              key={t}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                t === "Tháng" ? "bg-white text-black" : "text-ios-gray"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between glass-card py-3 px-4">
        <button onClick={prevMonth} className="p-1 active:scale-90 transition-transform">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-bold capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: vi })}
        </span>
        <button onClick={nextMonth} className="p-1 active:scale-90 transition-transform">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col items-center justify-center relative min-h-[300px]">
        {totalExpense > 0 ? (
          <>
            <div className="absolute inset-0 z-0">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="z-10 text-center"
            >
              <p className="text-ios-gray text-xs uppercase font-bold tracking-widest">Tổng chi</p>
              <p className="text-3xl font-bold mt-1">{(totalExpense / 1000).toFixed(0)}k</p>
            </motion.div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <PieChart className="w-8 h-8 text-ios-gray" />
            </div>
            <p className="text-ios-gray">Không có dữ liệu tháng này</p>
          </div>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Danh mục chi tiêu</h3>
        <div className="space-y-3">
          {chartData.sort((a, b) => b.value - a.value).map((cat) => {
            const percentage = ((cat.value / totalExpense) * 100).toFixed(0);
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  {cat.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-sm font-bold">{(cat.value / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
                <div className="text-[10px] font-bold text-ios-gray w-8 text-right">
                  {percentage}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
