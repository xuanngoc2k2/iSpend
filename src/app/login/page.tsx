"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight">Chào mừng 👋</h1>
        <p className="text-ios-gray mt-2">Đăng nhập để quản lý chi tiêu</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleLogin}
        className="glass-card p-6 space-y-4"
      >
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-gray w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded-ios-md py-4 pl-12 pr-4 focus:outline-none focus:border-ios-blue transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-gray w-5 h-5" />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full bg-white/5 border border-white/10 rounded-ios-md py-4 pl-12 pr-4 focus:outline-none focus:border-ios-blue transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-ios-blue text-white rounded-ios-md py-4 font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </motion.form>

      <div className="mt-8 text-center">
        <p className="text-ios-gray">
          Chưa có tài khoản?{" "}
          <Link href="/signup" className="text-ios-blue font-medium">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
