"use client";

import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { User, LogOut, ChevronRight, Bell, Shield, HelpCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, signOut } = useAuthStore();

  const SETTINGS = [
    { icon: Bell, label: "Thông báo", color: "bg-ios-blue" },
    { icon: Shield, label: "Bảo mật", color: "bg-ios-green" },
    { icon: HelpCircle, label: "Trợ giúp", color: "bg-ios-gray" },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Cá nhân</h1>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <User className="w-10 h-10 text-ios-gray" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.email?.split("@")[0] || "Người dùng"}</h2>
          <p className="text-ios-gray text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="glass-card overflow-hidden">
        {SETTINGS.map((item, idx) => (
          <motion.div
            key={item.label}
            whileTap={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            className={`flex items-center justify-between p-4 ${idx !== SETTINGS.length - 1 ? "border-b border-white/5" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-white`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-ios-gray/30" />
          </motion.div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={signOut}
        className="w-full glass-card p-4 text-ios-red font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <LogOut className="w-5 h-5" />
        Đăng xuất
      </button>
    </div>
  );
}
