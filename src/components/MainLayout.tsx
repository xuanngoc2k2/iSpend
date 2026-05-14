"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, BarChart2, CreditCard, PieChart, User } from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: BarChart2, label: "Thống kê", href: "/statistics" },
  { icon: CreditCard, label: "Tài khoản", href: "/wallets" },
  { icon: PieChart, label: "Ngân sách", href: "/budget" },
  { icon: User, label: "Cá nhân", href: "/profile" },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-2xl font-bold italic"
        >
          iSpend
        </motion.div>
      </div>
    );
  }

  // Hide Nav for Auth pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex-1 overflow-y-auto">{children}</div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-50">
        <nav className="glass-card flex items-center justify-around py-3 px-2 shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActive ? "text-ios-blue" : "text-ios-gray"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="w-1 h-1 bg-ios-blue rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
