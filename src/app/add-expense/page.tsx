"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, X, Check, Loader2, Camera as CameraIcon,
  Calendar, ChevronDown, ArrowUp, ArrowDown, Calculator, 
  Delete, Utensils, Wallet, Plus, Minus, ChevronRight // Added for month navigation
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format, isToday, parseISO, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { useAuthStore } from "@/store/authStore";
import { useTransactionStore } from "@/store/transactionStore";
import { transactionService } from "@/services/transactionService";
import { CameraCapture } from "@/components/CameraCapture";

// Custom Date Picker Modal component
const DatePickerModal = ({
  initialDate,
  onClose,
  onDateSelect,
}: {
  initialDate: Date;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    onDateSelect(day);
    onClose(); // Close modal after selection
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-x-0 bottom-0 z-[999] bg-[#1C1C1E] rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col"
    >
      <div className="p-4 flex justify-center relative border-b border-white/10">
        <button
          onClick={onClose}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-blue text-base font-medium active:opacity-60 transition-opacity"
        >
          Hủy
        </button>
        <h3 className="text-base font-semibold">Chọn ngày</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-bold text-lg capitalize">
            {format(currentMonth, "MMMM yyyy", { locale: vi })}
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

        <div className="grid grid-cols-7 mb-4">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
            <div key={day} className="text-[10px] text-ios-gray font-bold text-center uppercase">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-4">
          {days.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            return (
              <div
                key={day.toString()}
                className={`relative flex flex-col items-center justify-center cursor-pointer transition-opacity ${!isCurrentMonth ? "opacity-0 pointer-events-none" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-all ${
                  isSelected
                    ? "bg-ios-blue text-white shadow-lg"
                    : isToday(day)
                    ? "bg-ios-blue/20 text-ios-blue"
                    : "text-white"
                }`}>
                  {format(day, "d")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onClose}
          className="w-full py-3 bg-ios-blue rounded-full text-white font-bold text-lg shadow-lg shadow-ios-blue/30 active:scale-95 transition-transform"
        >
          Xong
        </button>
      </div>
    </motion.div>
  );
};


export default function AddExpensePage() {
  const router = useRouter();
  // Removed unused native date input and its ref
  const { user } = useAuthStore();
  const { addTransaction } = useTransactionStore();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [loading, setLoading] = useState(false);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control modal visibility

  useEffect(() => {
    transactionService.getCategories().then(data => {
      setCategories(data);
      if (data.length > 0) setCategory(data[0].id);
    });
  }, []);

  // Updated handler to set the date state directly from the modal
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleCapture = (blob: Blob) => {
    setCapturedBlob(blob);
    setPreviewUrl(URL.createObjectURL(blob));
    setStep(2);
  };

  const handleKeypadClick = (val: string) => {
    if (val === "delete") {
      setAmount(amount.length > 1 ? amount.slice(0, -1) : "0");
    } else if (val === "clear") {
      setAmount("0");
    } else if (val === "000") {
      setAmount(amount === "0" ? "0" : amount + "000");
    } else {
      if (amount === "0" && val !== ".") {
        setAmount(val);
      } else {
        setAmount(amount + val);
      }
    }
  };

  const handleSave = async () => {
    if (!user || amount === "0") return;
    
    setLoading(true);
    try {
      let image_url = "";
      
      if (capturedBlob) {
        const fileName = `${user.id}/${Date.now()}.jpg`;
        image_url = await transactionService.uploadImage(capturedBlob, fileName);
      }
      
      await addTransaction({
        user_id: user.id,
        amount: Number(amount),
        note,
        category_id: category,
        type,
        image_url,
        date: date.toISOString(),
      });
      router.push("/");
    } catch (error: any) {
      console.error(error);
      alert("Lỗi: " + (error.message || "Không thể lưu giao dịch"));
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <CameraCapture 
          onCapture={handleCapture}
          onClose={() => router.back()}
        />
        <button 
          onClick={() => router.back()}
          className="absolute bottom-10 left-10 text-white font-medium z-50 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 active:scale-95 transition-all"
        >
          Hủy
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B12] flex flex-col relative overflow-hidden text-white">
      <div className="flex-1 flex flex-col relative z-10">
        {/* Photo Background Area */}
        <div className="relative h-[45vh] w-full overflow-hidden rounded-b-[40px]">
          {previewUrl ? (
            <img src={previewUrl} className="w-full h-full object-cover" alt="Receipt" />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-ios-gray/20 to-transparent flex items-center justify-center">
              <CameraIcon className="w-12 h-12 text-ios-gray/30" />
            </div>
          )}
          
          {/* Glass Input Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <div className="w-full max-w-sm glass-card p-6 rounded-[32px] space-y-4 border-white/10 shadow-2xl">
              <div className="flex items-center justify-center gap-3">
                <span className={`text-4xl font-bold ${type === 'expense' ? 'text-ios-red' : 'text-ios-green'}`}>
                  {type === 'expense' ? '-' : '+'}
                </span>
                <span className="text-5xl font-bold tracking-tight">
                  {Number(amount).toLocaleString("vi-VN")}
                </span>
                <span className="text-2xl font-medium text-ios-gray pt-3">đ</span>
              </div>
              
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-gray">
                  <Calculator className="w-4 h-4" />
                </div>
                <input
                  placeholder="Thêm chi tiết"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-center text-sm focus:outline-none focus:border-ios-blue transition-colors"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(1)} 
            className="absolute top-14 left-6 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Controls Section */}
        <div className="p-6 flex flex-col items-center space-y-4 -mt-6">
          <div className="flex gap-2 w-full max-w-sm">
            <button className="flex-1 bg-white/5 border border-white/10 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-medium active:bg-white/10 transition-colors">
              <Utensils className="w-4 h-4 text-ios-green" />
              <span>Ăn uống</span>
              <ChevronDown className="w-4 h-4 text-ios-gray" />
            </button>
            <button className="flex-1 bg-white/5 border border-white/10 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-medium active:bg-white/10 transition-colors">
              <Wallet className="w-4 h-4 text-ios-blue" />
              <span>Wallet</span>
              <ChevronDown className="w-4 h-4 text-ios-gray" />
            </button>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-1 w-24">
            <button 
              onClick={() => setType("expense")}
              className={`flex-1 flex items-center justify-center p-2 rounded-full transition-all ${type === "expense" ? "bg-ios-red text-white shadow-lg" : "text-ios-gray"}`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setType("income")}
              className={`flex-1 flex items-center justify-center p-2 rounded-full transition-all ${type === "income" ? "bg-ios-green text-white shadow-lg" : "text-ios-gray"}`}
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Date Picker Button */}
          <button 
            onClick={() => setShowDatePicker(true)}
            className="bg-white/5 border border-white/10 rounded-full py-2 px-6 flex items-center gap-2 text-sm font-medium active:bg-white/10 transition-colors"
          >
            <Calendar className="w-4 h-4 text-ios-blue" />
            <span>{isToday(date) ? "Hôm nay" : format(date, "dd/MM/yyyy", { locale: vi })}</span>
            <ChevronDown className="w-4 h-4 text-ios-gray" />
          </button>
        </div>

        {/* Calculator Keypad */}
        <div className="p-4 bg-[#1C1C1E] rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-4 gap-2">
            {[
              "1", "2", "3", "÷",
              "4", "5", "6", "×",
              "7", "8", "9", "-",
              ".", "0", "000", "+"
            ].map((key) => {
              const isOperator = ["÷", "×", "-", "+"].includes(key);
              return (
                <button
                  key={key}
                  onClick={() => handleKeypadClick(key === "×" ? "*" : key)}
                  className={`h-14 rounded-2xl flex items-center justify-center text-2xl font-semibold transition-all active:scale-95 ${
                    isOperator ? "bg-ios-red/10 text-ios-red" : "bg-white/5 text-white active:bg-white/10"
                  }`}
                >
                  {key}
                </button>
              );
            })}
            <div className="col-span-4 grid grid-cols-4 gap-2 mt-2">
              <button 
                onClick={() => handleKeypadClick("delete")}
                className="h-14 bg-white/5 rounded-2xl flex items-center justify-center active:bg-white/10"
              >
                <Delete className="w-6 h-6 text-ios-gray" />
              </button>
              <button 
                onClick={() => handleKeypadClick("clear")}
                className="h-14 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-bold text-ios-red active:bg-white/10"
              >
                C
              </button>
              <button
                onClick={handleSave}
                disabled={loading || amount === "0"}
                className="col-span-2 h-14 bg-ios-red text-white rounded-2xl flex items-center justify-center text-4xl font-light active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-ios-red/20"
              >
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : "="}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Date Picker Modal */}
      <AnimatePresence>
        {showDatePicker && (
          <DatePickerModal
            initialDate={date}
            onClose={() => setShowDatePicker(false)}
            onDateSelect={handleDateChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
