'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User, Settings, LogOut, ChevronDown, Sun, Moon, BarChart3, TrendingUp, DollarSign, Package, Check
} from "lucide-react";

const MENU = [
  { key: "dashboard", name: "Dashboard", icon: "/Images/Dashboard.png", path: "/dashboard" },
  { key: "administrador", name: "Administrador", icon: "/Images/Admin.png", path: "/administrador" },
  { key: "central", name: "Central de Dados", icon: "/Images/Data.png", path: "/central" },
  { key: "outage", name: "Outage & OS", icon: "/Images/Outage.png", path: "/outage" },
  { key: "estoque", name: "Estoque", icon: "/Images/Package.png", path: "/estoque" },
  { key: "relatorios", name: "Relatórios", icon: "/Images/Chart.png", path: "/relatorios" },
  { key: "settings", name: "Configurações", icon: "/Images/Settings.png", path: "/settings" },
];

export default function Relatorios() {
  const [darkMode, setDarkMode] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`min-h-screen font-inter p-8 transition-colors duration-500 antialiased ${
        darkMode
          ? "bg-gradient-to-br from-[#0e1628] via-[#121b31] to-[#1c2741] text-white"
          : "bg-gradient-to-br from-white via-[#f3f8ff] to-[#e4efff] text-[#1a2740]"
      }`}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        {/* SIDEBAR (mudar dps) */}
        <aside className={`rounded-2xl p-6 flex flex-col justify-between border shadow-[0_6px_30px_rgba(0,0,0,0.06)] ${
          darkMode ? "bg-[#19233b]/60 border-[#2a3658]" : "bg-gradient-to-br from-[#ffffff] to-[#f0f6ff] border-[#e2ecff]"
        }`}>
          <div>
            <div className="flex items-center justify-center mb-6">
              <Link href="/dashboard"><Image src="/Images/MasterFrio_Logo.png" alt="Logo" width={160} height={40} className="h-10 w-auto" /></Link>
            </div>
            <nav className="flex flex-col gap-2 text-sm">
              {MENU.map(m => (
                <Link key={m.key} href={m.path}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                    m.key === "relatorios"
                      ? darkMode ? "bg-[#243459] text-blue-100 shadow-inner border border-[#2e3a5f]"
                      : "bg-blue-50 text-blue-700 shadow-inner border border-blue-100"
                      : darkMode ? "text-blue-100 hover:bg-[#243459]" : "text-[#1a2740] hover:bg-blue-50"
                  }`}>
                  <div className="w-5 h-5"><Image src={m.icon} alt="" width={20} height={20} className="opacity-90" /></div>
                  <span className="font-medium">{m.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-6">
            <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
              darkMode ? "bg-blue-500/10 border-blue-800 text-blue-300 hover:bg-blue-500/20"
                : "bg-blue-500/10 border-blue-100 text-blue-600 hover:bg-blue-500/20"
            }`}>
              <LogOut size={18} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
            <div className={`text-[12px] mt-6 text-center ${darkMode ? "text-blue-400/60" : "text-[#7b8cbf]"}`}>© 2025 Masterfrio</div>
          </div>
        </aside>

        <main className="space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${darkMode ? "text-blue-200" : "text-blue-700"}`}>Relatórios & Análises</h1>
              <p className={`text-sm ${darkMode ? "text-blue-300/70" : "text-blue-500"}`}>Visão completa do desempenho da empresa</p>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2">
                <Sun size={16} className={`${!darkMode ? "text-yellow-400" : "text-gray-500"}`} />
                <motion.div animate={{ rotate: darkMode ? 180 : 0 }}>
                  {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                </motion.div>
                <Moon size={16} className={`${darkMode ? "text-blue-300" : "text-gray-400"}`} />
              </button>

              <div className="relative">
                <button onClick={() => setUserOpen(!userOpen)} className={`flex items-center gap-3 px-4 py-2 rounded-xl ${darkMode ? "bg-[#243459] text-white" : "bg-blue-50 text-[#1a2740]"}`}>
                  <User size={18} className="text-blue-600 dark:text-blue-300" />
                  <span className="text-sm font-medium">Pedro G.</span>
                  <ChevronDown size={16} className={`transition-transform ${userOpen ? "rotate-180" : ""}`} />
                </button>
                {userOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-[110%] right-0 w-48 rounded-xl shadow-lg border ${darkMode ? "bg-[#1b2540] border-[#2a3658]" : "bg-white border-blue-100"}`}>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#243459] flex items-center gap-3 text-sm"><User size={16} />Perfil</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#243459] flex items-center gap-3 text-sm"><Settings size={16} />Configurações</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover-bg-[#2e3a5f] flex items-center gap-3 text-sm text-red-500"><LogOut size={16} />Sair</button>
                  </motion.div>
                )}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Faturamento Mês", value: "R$ 184.520", icon: <DollarSign size={28} />, color: "from-emerald-400 to-emerald-600", var: "+12%" },
              { title: "Ordens Concluídas", value: "342", icon: <Check size={28} />, color: "from-blue-400 to-blue-600", var: "+8%" },
              { title: "Ticket Médio", value: "R$ 1.280", icon: <TrendingUp size={28} />, color: "from-purple-400 to-purple-600", var: "+5%" },
              { title: "Estoque Baixo", value: "18 itens", icon: <Package size={28} />, color: "from-orange-400 to-red-500", var: "-3%" },
            ].map((c, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br ${c.color}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-90">{c.title}</div>
                    <div className="text-3xl font-bold mt-2">{c.value}</div>
                    <div className={`text-sm mt-2 ${c.var.startsWith("+") ? "text-green-200" : "text-red-200"}`}>{c.var} vs mês anterior</div>
                  </div>
                  {c.icon}
                </div>
              </motion.div>
            ))}
          </div>

          <section className={`rounded-2xl border p-6 ${darkMode ? "border-[#223054] bg-[#0f1724]/60" : "border-[#e3edff] bg-white"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Vendas do Mês (Novembro 2025)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-blue-600 uppercase text-xs">
                  <tr>
                    <th className="text-left py-3">Data</th>
                    <th className="text-left py-3">Cliente</th>
                    <th className="text-left py-3">Serviço</th>
                    <th className="text-center py-3">Qtd Itens</th>
                    <th className="text-right py-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {[
                    { data: "13/11", cliente: "Supermercado Central", servico: "Instalação Câmara Fria", qtd: 12, total: "R$ 24.800" },
                    { data: "12/11", cliente: "Restaurante Sabor", servico: "Manutenção Ar Split", qtd: 5, total: "R$ 3.200" },
                    { data: "11/11", cliente: "Loja Eletro", servico: "Troca Compressor", qtd: 8, total: "R$ 9.400" },
                    { data: "10/11", cliente: "Carlos Mendes", servico: "Instalação Split 9000BTU", qtd: 3, total: "R$ 4.200" },
                  ].map((v, i) => (
                    <tr key={i} className="hover:bg-blue-50/40">
                      <td className="py-3">{v.data}</td>
                      <td className="py-3">{v.cliente}</td>
                      <td className="py-3">{v.servico}</td>
                      <td className="py-3 text-center">{v.qtd}</td>
                      <td className="py-3 text-right font-bold text-green-600">{v.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`rounded-2xl border p-8 text-center ${darkMode ? "border-[#223054] bg-[#071226]/40" : "border-gray-200 bg-gray-50"}`}>
              <BarChart3 size={48} className="mx-auto text-blue-500 mb-4" />
              <div className="text-lg font-medium">Gráfico de Vendas Mensais</div>
              <div className="text-sm text-blue-500 mt-2">(Recharts ou Chart.js aqui)</div>
            </div>
            <div className={`rounded-2xl border p-8 text-center ${darkMode ? "border-[#223054] bg-[#071226]/40" : "border-gray-200 bg-gray-50"}`}>
              <TrendingUp size={48} className="mx-auto text-emerald-500 mb-4" />
              <div className="text-lg font-medium">Crescimento Anual</div>
              <div className="text-sm text-blue-500 mt-2">(Gráfico de linha aqui)</div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}