'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sun, Moon, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0e1628] via-[#121b31] to-[#1c2741]"
          : "bg-gradient-to-br from-[#f0f6ff] via-white to-[#e4efff]"
      }`}
    >
      <div className={`w-full max-w-md`}>
        <div className="flex justify-center mb-8">
          <Image src="/Images/MasterFrio_Logo.png" alt="MasterFrio" width={200} height={50} priority />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl p-8 shadow-xl border ${
            darkMode ? "bg-[#0f1724]/80 border-[#223054]" : "bg-white border-[#e3edff]"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${darkMode ? "text-blue-200" : "text-blue-700"}`}>
              Bem-vindo de volta
            </h1>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2">
              {darkMode ? <Moon size={20} className="text-blue-300" /> : <Sun size={20} className="text-yellow-500" />}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-blue-100" : "text-gray-700"}`}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none transition ${
                  darkMode ? "bg-[#1b2540] border-[#2a3658] text-white" : "bg-gray-50 border-gray-200"
                }`}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-blue-100" : "text-gray-700"}`}>
                Senha
              </label>
              <input
                type="password"
                required
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none transition ${
                  darkMode ? "bg-[#1b2540] border-[#2a3658] text-white" : "bg-gray-50 border-gray-200"
                }`}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              {loading ? "Entrando..." : <>Entrar <LogIn size={18} /></>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-blue-500">
            Esqueceu a senha? <a href="#" className="font-medium hover:underline">Recuperar</a>
          </div>
        </motion.div>

        <div className={`text-center mt-8 text-sm ${darkMode ? "text-blue-400/60" : "text-gray-500"}`}>
          © 2025 Masterfrio – Todos os direitos reservados
        </div>
      </div>
    </motion.div>
  );
}