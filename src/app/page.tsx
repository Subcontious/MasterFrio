'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User, Settings, LogOut, ChevronDown, Sun, Moon, BarChart3,
  Wrench, Users, Package
} from "lucide-react";

const MENU = [
  { key: "dashboard", name: "Dashboard", icon: "/Images/Dashboard.png", path: "/dashboard" },
  { key: "administrador", name: "Administrador", icon: "/Images/Admin.png", path: "/administrador" },
  { key: "central", name: "Central de Dados", icon: "/Images/Data.png", path: "/central" },
  { key: "outage", name: "Outage & OS", icon: "/Images/Outage.png", path: "/outage" },
  { key: "estoque", name: "Estoque", icon: "/Images/Package.png", path: "/estoque" },
  { key: "relatorios", name: "Relatórios", icon: "/Images/Chart.png", path: "/relatorios" },
  { key: "settings", name: "Configurações", icon: "/Images/Settings.png", path: "/settings" },
] as const;

export default function Dashboard() {
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
              <Link href="/dashboard">
                <Image src="/Images/MasterFrio_Logo.png" alt="Logo" width={160} height={40} className="h-10 w-auto" priority />
              </Link>
            </div>
            <nav className="flex flex-col gap-2 text-sm">
              {MENU.map((m) => (
                <Link
                  key={m.key}
                  href={m.path}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                    m.key === "dashboard"
                      ? darkMode
                        ? "bg-[#243459] text-blue-100 shadow-inner border border-[#2e3a5f]"
                        : "bg-blue-50 text-blue-700 shadow-inner border border-blue-100"
                      : darkMode
                      ? "text-blue-100 hover:bg-[#243459]"
                      : "text-[#1a2740] hover:bg-blue-50"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Image src={m.icon} alt="" width={20} height={20} className="opacity-90" />
                  </div>
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
              <h1 className={`text-2xl font-bold tracking-tight ${darkMode ? "text-blue-200" : "text-blue-700"}`}>Dashboard Financeiro</h1>
              <p className={`text-sm ${darkMode ? "text-blue-300/70" : "text-blue-500"}`}>Visão geral financeira, ordens e estoque.</p>
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
                    <button className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-[#2e3a5f] flex items-center gap-3 text-sm text-red-500"><LogOut size={16} />Sair</button>
                  </motion.div>
                )}
              </div>
            </div>
          </header>

          <section className={`bg-white border rounded-2xl p-6 shadow-sm ${darkMode ? "bg-[#0f1724]/60 border-[#223054]" : "border-[#e3edff]"}`}>
            <div className="space-y-6">
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { title: "Faturamento do Mês", value: "R$ 84.200", icon: <BarChart3 />, color: "from-blue-400 to-blue-600" },
                  { title: "Ordens Concluídas", value: "128", icon: <Wrench />, color: "from-sky-300 to-blue-400" },
                  { title: "Clientes Ativos", value: "234", icon: <Users />, color: "from-blue-200 to-blue-400" },
                  { title: "Estoque Baixo", value: "12 itens", icon: <Package />, color: "from-blue-400 to-sky-500" },
                ].map((c, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.03 }} className={`p-4 rounded-xl text-white shadow-md bg-gradient-to-br ${c.color}`}>
                    <div className="flex justify-between items-center">
                      <div className="text-xs opacity-90">{c.title}</div>
                      <div>{c.icon}</div>
                    </div>
                    <div className="text-2xl font-bold mt-3">{c.value}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                <section>
                  <h3 className={`text-sm font-semibold ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Ordens de Serviço Recentes</h3>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-blue-500 uppercase text-xs tracking-wide">
                        <tr>
                          <th className="pb-2 text-left">Cliente</th>
                          <th className="pb-2 text-left">Serviço</th>
                          <th className="pb-2 text-left">Status</th>
                          <th className="pb-2 text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-50">
                        {[
                          { cliente: "Carlos Mendes", servico: "Instalação Split 9000BTU", status: "Concluído", valor: "R$ 1.200" },
                          { cliente: "Loja FrioTec", servico: "Manutenção preventiva", status: "Em andamento", valor: "R$ 850" },
                          { cliente: "Luciana Alves", servico: "Troca de compressor", status: "Pendente", valor: "R$ 1.400" },
                        ].map((o, i) => (
                          <tr key={i} className="hover:bg-blue-50/40">
                            <td className="py-2">{o.cliente}</td>
                            <td className="py-2 text-blue-800">{o.servico}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                o.status === "Concluído" ? "bg-green-100 text-green-700" :
                                o.status === "Em andamento" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }`}>{o.status}</span>
                            </td>
                            <td className="py-2 text-right font-semibold text-blue-700">{o.valor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <aside className="space-y-4">
                  <div className={`p-4 rounded-xl border ${darkMode ? "border-[#223054]/40 bg-[#071226]/40" : "border-blue-100 bg-white"}`}>
                    <h4 className={`text-sm font-medium ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Técnicos Online</h4>
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                          <div><div className="text-sm font-medium">Eduardo Lima</div><div className="text-xs text-blue-500">Instalação</div></div>
                        </div>
                        <div className="text-xs text-green-600 font-semibold">Em campo</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-300 to-sky-500" />
                          <div><div className="text-sm font-medium">Rafael Gomes</div><div className="text-xs text-blue-500">Manutenção</div></div>
                        </div>
                        <div className="text-xs text-green-600 font-semibold">Disponível</div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </main>
      </div>
    </motion.div>
  );
}