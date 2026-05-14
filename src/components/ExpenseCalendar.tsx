"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Plus, Bus, ShoppingCart, Utensils, Wallet } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { vi } from "date-fns/locale";
import { Transaction } from "@/services/transactionService";

interface ExpenseCalendarProps {
  transactions?: Transaction[];
  onDateSelect?: (date: Date) => void;
}

const CategoryIcon = ({ category, className }: { category?: string, className?: string }) => {
  switch (category?.toLowerCase()) {
    case "di chuyển":
    case "transport":
      return <Bus className={className} />;
    case "mua sắm":
    case "shopping":
      return <ShoppingCart className={className} />;
    case "ăn uống":
    case "food":
      return <Utensils className={className} />;
    default:
      return <Wallet className={className} />;
  }
};

const CategoryBadge = ({ category, color = "bg-ios-blue" }: { category?: string, color?: string }) => (
  <div className={`${color} rounded-lg p-1 shadow-lg border border-white/20`}>
    <CategoryIcon category={category} className="w-3.5 h-3.5 text-white" />
  </div>
);

const getCategoryColor = (category?: string) => {
  switch (category?.toLowerCase()) {
    case "di chuyển":
    case "transport":
      return "bg-ios-blue";
    case "mua sắm":
    case "shopping":
      return "bg-purple-500";
    case "ăn uống":
    case "food":
      return "bg-ios-green";
    default:
      return "bg-ios-gray";
  }
};

export function ExpenseCalendar({ transactions = [], onDateSelect }: ExpenseCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showGallery, setShowGallery] = useState<Transaction[] | null>(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayTransactions = (day: Date) => {
    return transactions.filter(t => isSameDay(new Date(t.date), day));
  };

  return (
    <div className="glass-card p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="font-bold text-lg capitalize">
          tháng {format(currentMonth, "M yyyy", { locale: vi })}
        </h3>
        <div className="flex gap-4">
          <button onClick={prevMonth} className="p-1 active:scale-90 transition-transform">
            <ChevronLeft className="w-5 h-5 text-ios-gray" />
          </button>
          <button onClick={nextMonth} className="p-1 active:scale-90 transition-transform">
            <ChevronRight className="w-5 h-5 text-ios-gray" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-4">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <div key={day} className="text-[10px] text-ios-gray font-bold text-center uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {days.map((day, idx) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const dayTransactions = getDayTransactions(day);
          const images = dayTransactions.filter(t => t.image_url).map(t => t.image_url);
          const hasTransactions = dayTransactions.length > 0;

          return (
            <div
              key={day.toString()}
              className={`relative flex flex-col items-center justify-start cursor-pointer transition-opacity ${!isCurrentMonth ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              onClick={() => {
                setSelectedDate(day);
                onDateSelect?.(day);
              }}
            >
              {/* Image Stack / Badge / Plus Container */}
              <div className="relative h-10 w-10 flex items-center justify-center mb-1">
                {images.length > 0 ? (
                  <div 
                    className="h-8 w-8 relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGallery(dayTransactions.filter(t => t.image_url));
                    }}
                  >
                    {/* Background images (fan stack) with blue border */}
                    {images.slice(0, 2).map((img, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-lg overflow-hidden border-2 border-ios-blue shadow-md"
                        style={{
                          zIndex: 2 - i,
                          rotate: i === 0 ? -10 : 15,
                          x: i === 0 ? -4 : 5,
                          y: i === 0 ? 0 : -2,
                        }}
                      >
                        <img src={img!} className="w-full h-full object-cover" alt="" />
                      </motion.div>
                    ))}
                    
                    {/* Category badge on top of image stack (Only for specific categories, not default wallet or food) */}
                    {["di chuyển", "transport", "mua sắm", "shopping"].includes((dayTransactions[0] as any).categories?.name?.toLowerCase() || "") && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <CategoryBadge category={(dayTransactions[0] as any).categories?.name} />
                      </div>
                    )}

                    {/* Extra count badge (+N) */}
                    {images.length > 2 && (
                      <div className="absolute -bottom-1 -right-1 bg-ios-blue text-[8px] text-white px-1 h-[12px] flex items-center justify-center rounded-full font-bold z-20 border border-background">
                        +{images.length - 2}
                      </div>
                    )}
                  </div>
                ) : hasTransactions ? (
                  /* Only category badge if no images */
                  <CategoryBadge category={(dayTransactions[0] as any).categories?.name} color={dayTransactions[0].type === 'income' ? 'bg-ios-green' : 'bg-ios-blue'} />
                ) : (
                  /* Plus icon circle for empty days */
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-ios-gray/30">
                    <Plus className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Day Number (Very small as requested) */}
              <div className={`text-[9px] font-medium transition-colors ${
                isSelected ? "text-ios-blue font-bold" : "text-white"
              }`}>
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-screen Gallery Modal (IMG_5884 Style) */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[999] bg-[#0B0B12] flex flex-col max-h-screen overflow-hidden" 
          >
            {/* Header */}
            <div className="pt-14 pb-4 px-6 relative border-b border-white/5">
              <div className="text-center">
                <h2 className="text-[17px] font-semibold text-white">
                  {format(new Date(showGallery[0].date), "d 'thg' M, yyyy", { locale: vi })}
                </h2>
                <div className="flex items-center justify-center gap-1 mt-1 text-ios-red">
                  <span className="text-sm">↗</span>
                  <span className="text-[15px] font-bold">
                    {showGallery.reduce((sum, t) => sum + Number(t.amount), 0).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowGallery(null)} 
                className="absolute right-6 top-14 text-ios-blue text-[17px] font-medium active:opacity-60 transition-opacity"
              >
                Đóng
              </button>
            </div>
            
            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="grid grid-cols-3 gap-2">
                {showGallery.map((t) => {
                  const catName = (t as any).categories?.name;
                  const catColor = getCategoryColor(catName);
                  return (
                    <motion.div
                      key={t.id}
                      className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent border border-white/5 shadow-sm"
                    >
                      {t.image_url ? (
                        <img src={t.image_url} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${catColor}/80 ${catColor}/40`}>
                          <CategoryIcon category={catName} className="w-10 h-10 text-white/40" />
                        </div>
                      )}
                      
                      {/* Category Pill */}
                      <div className={`absolute top-2 left-2 px-2 py-0.5 ${catColor} rounded-md shadow-lg`}>
                        <p className="text-[9px] font-bold text-white whitespace-nowrap">
                          {catName || "Khác"}
                        </p>
                      </div>

                      {/* Amount Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-3">
                        <p className="text-[13px] font-bold text-white">
                          -{Number(t.amount).toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
