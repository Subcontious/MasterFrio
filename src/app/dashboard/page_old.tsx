'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               PAGE COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen font-inter p-8 transition-all duration-500 antialiased ${
        darkMode
          ? "bg-gradient-to-br from-[#0e1628] via-[#121b31] to-[#1c2741] text-white"
          : "bg-gradient-to-br from-white via-[#f3f8ff] to-[#e4efff] text-[#1a2740]"
      }`}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <Sidebar darkMode={darkMode} />
        <MainContent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userOpen={userOpen}
          setUserOpen={setUserOpen}
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 SIDEBAR                                    */
/* -------------------------------------------------------------------------- */
function Sidebar({ darkMode }: { darkMode: boolean }) {
  const menu = [
    { name: "Dashboard", icon: "/Images/Dashboard.png" },
    { name: "Administrador", icon: "/Images/Admin.png" },
    { name: "Central de Dados", icon: "/Images/Data.png" },
    { name: "Outage & OS", icon: "/Images/Outage.png" },
    { name: "Configurações", icon: "/Images/Settings.png" },
  ];

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`rounded-2xl p-6 flex flex-col justify-between border shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${
        darkMode
          ? "bg-[#19233b]/60 border-[#2a3658]"
          : "bg-gradient-to-br from-[#ffffff] to-[#f0f6ff] border-[#e2ecff]"
      }`}
    >
      <div>
        <div className="flex items-center justify-center mb-6">
          <Link href="/">
            <Image
              src="/Images/MasterFrio_Logo.png"
              alt="MasterFrio Logo"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {menu.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{
                scale: 1.03,
                backgroundColor: darkMode ? "#243459" : "rgba(224,239,255,0.7)",
              }}
              transition={{ duration: 0.2 }}
              className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                darkMode
                  ? "text-blue-100 hover:bg-[#243459]"
                  : "text-[#1a2740] hover:bg-blue-50"
              }`}
            >
              <Image
                src={item.icon}
                alt={`${item.name} ícone`}
                width={20}
                height={20}
                className="opacity-90"
              />
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      <div className="mt-8 space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
            darkMode
              ? "bg-blue-500/10 border-blue-800 text-blue-300 hover:bg-blue-500/20"
              : "bg-blue-500/10 border-blue-100 text-blue-600 hover:bg-blue-500/20"
          }`}
        >
          <LogOut size={18} />
          <span className="text-sm font-semibold">Logout</span>
        </motion.button>

        <div
          className={`text-[12px] mt-6 text-center ${
            darkMode ? "text-blue-400/60" : "text-[#7b8cbf]"
          }`}
        >
          © 2025 Masterfrio
        </div>
      </div>
    </motion.aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN CONTENT                                 */
/* -------------------------------------------------------------------------- */
function MainContent({
  darkMode,
  setDarkMode,
  userOpen,
  setUserOpen,
}: any) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* HEADER SUPERIOR */}
      <header className="flex items-center justify-between relative">
        <h1
          className={`text-2xl font-bold tracking-tight ${
            darkMode ? "text-blue-200" : "text-blue-700"
          }`}
        >
          Dashboard Financeiro
        </h1>

        <div className="flex items-center gap-4">
          {/* DARK MODE TOGGLE */}
          <div className="flex items-center gap-2">
            <Sun
              size={16}
              className={`${!darkMode ? "text-yellow-400" : "text-gray-500"}`}
            />
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            <Moon
              size={16}
              className={`${darkMode ? "text-blue-300" : "text-gray-400"}`}
            />
          </div>

          {/* USER PANEL */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => setUserOpen(!userOpen)}
            className={`relative ${
              darkMode ? "bg-[#243459]" : "bg-blue-50"
            } px-4 py-2 rounded-xl cursor-pointer flex items-center gap-3 transition-all`}
          >
            <User size={18} className="text-blue-600 dark:text-blue-300" />
            <span className="text-sm font-medium">Pedro G.</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                userOpen ? "rotate-180" : "rotate-0"
              }`}
            />

            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute top-[110%] right-0 w-48 rounded-xl shadow-lg overflow-hidden border ${
                  darkMode
                    ? "bg-[#1b2540] border-[#2a3658]"
                    : "bg-white border-blue-100"
                }`}
              >
                <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#243459] transition-colors text-sm">
                  <User size={16} />
                  Perfil
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#243459] transition-colors text-sm">
                  <Settings size={16} />
                  Configurações
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-blue-100 dark:hover:bg-[#2e3a5f] transition-colors text-sm text-red-500">
                  <LogOut size={16} />
                  Sair
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*                        BOX UNIFICADA DO DASHBOARD                  */}
      {/* ------------------------------------------------------------------ */}
      <Card
        className={`p-8 rounded-2xl border shadow-sm ${
          darkMode
            ? "bg-[#1b2540]/70 border-[#2a3658] text-blue-100"
            : "bg-white border-[#e3edff] text-[#1a2740]"
        }`}
      >
        {/* Cards Pequenos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <DashboardCard
            title="Saldo em Conta"
            subtitle="BRL"
            value="4.509.063"
            color="from-blue-400 to-blue-600"
            darkMode={darkMode}
          />
          <DashboardCard
            title="Despesas Totais"
            subtitle="BRL"
            value="3.041.730"
            color="from-sky-300 to-sky-500"
            darkMode={darkMode}
          />
          <DashboardCard
            title="Investimentos"
            subtitle="BRL"
            value="1.021.238"
            color="from-blue-300 to-blue-500"
            darkMode={darkMode}
          />
        </div>

        {/* Histórico de Transações */}
        <div
          className={`rounded-xl border p-6 mb-10 ${
            darkMode
              ? "border-[#2a3658] bg-[#243459]/50"
              : "border-[#e3edff] bg-blue-50/30"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-blue-200" : "text-blue-700"
            }`}
          >
            Histórico de Transações
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead
                className={`uppercase text-xs tracking-wide ${
                  darkMode ? "text-blue-400/70" : "text-blue-500"
                }`}
              >
                <tr>
                  <th className="pb-3">Nome</th>
                  <th className="pb-3">Produto</th>
                  <th className="pb-3">Data</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  darkMode ? "divide-blue-900/40" : "divide-blue-50"
                }`}
              >
                {transactions.map((t, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`transition-colors ${
                      darkMode
                        ? "hover:bg-[#2e3a5f]/40"
                        : "hover:bg-blue-50 text-blue-800"
                    }`}
                  >
                    <td className="py-4 font-medium">{t.name}</td>
                    <td className="py-4 opacity-80">{t.product}</td>
                    <td className="py-4 opacity-80">{t.date}</td>
                    <td className="py-4 text-right font-semibold">
                      {t.total}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gráfico e Legenda */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div
            className={`rounded-xl border p-6 ${
              darkMode
                ? "border-[#2a3658] bg-[#243459]/50"
                : "border-[#e3edff] bg-blue-50/30"
            }`}
          >
            <h3
              className={`text-sm font-medium mb-4 ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Distribuição Total
            </h3>
            <WaveChart darkMode={darkMode} />
          </div>

          <div
            className={`rounded-xl border p-6 flex flex-col gap-4 ${
              darkMode
                ? "border-[#2a3658] bg-[#243459]/50"
                : "border-[#e3edff] bg-blue-50/30"
            }`}
          >
            {[
              { label: "Compras", percent: 52, color: "from-blue-400 to-blue-600" },
              { label: "Eletrônicos", percent: 21, color: "from-sky-300 to-sky-500" },
              { label: "Viagens", percent: 27, color: "from-blue-200 to-blue-400" },
            ].map((it) => (
              <LegendItem key={it.label} {...it} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </Card>
    </motion.main>
  );
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENTES AUXILIARES                        */
/* -------------------------------------------------------------------------- */
function DashboardCard({ title, subtitle, value, color, darkMode }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-2xl border shadow-sm transition-all ${
        darkMode
          ? "bg-[#243459]/50 border-[#2a3658]"
          : "bg-blue-50/30 border-blue-100"
      }`}
    >
      <div className="text-sm font-medium text-blue-500">{title}</div>
      <div
        className={`mt-2 p-4 rounded-xl bg-gradient-to-br ${color} text-white shadow-inner`}
      >
        <div className="text-xs opacity-90">{subtitle}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </motion.div>
  );
}

function LegendItem({ label, percent, color, darkMode }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-xl ${
            darkMode ? "bg-[#1b2540]" : "bg-blue-50"
          } border border-blue-100`}
        />
        <div>
          <div
            className={`text-sm font-medium ${
              darkMode ? "text-blue-200" : "text-blue-800"
            }`}
          >
            {label}
          </div>
          <div
            className={`text-xs ${
              darkMode ? "text-blue-400/70" : "text-blue-500/70"
            }`}
          >
            {percent}%
          </div>
        </div>
      </div>
      <div className="flex-1 ml-4 h-2 bg-blue-50 dark:bg-[#1b2540] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-2 rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

function WaveChart({ darkMode }: { darkMode: boolean }) {
  return (
    <svg viewBox="0 0 600 120" className="w-full h-36">
      <defs>
        <linearGradient id="waveGrad" x1="0" x2="1">
          <stop
            offset="0%"
            stopColor={darkMode ? "#60a5fa" : "#3b82f6"}
            stopOpacity="0.9"
          />
          <stop
            offset="100%"
            stopColor={darkMode ? "#93c5fd" : "#60a5fa"}
            stopOpacity="0.9"
          />
        </linearGradient>
      </defs>

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M0,70 C100,20 200,120 300,70 C400,20 500,120 600,70 L600,120 L0,120 Z"
        fill="url(#waveGrad)"
        opacity="0.25"
      />

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M0,70 C100,20 200,120 300,70 C400,20 500,120 600,70"
        stroke={darkMode ? "#60a5fa" : "#2563eb"}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                           TRANSAÇÕES (EXEMPLO)                             */
/* -------------------------------------------------------------------------- */
const transactions = [
  { name: "Tesco Market", product: "Compras", date: "13 Dez 2020", total: "R$75,67" },
  { name: "ElectroMen Market", product: "Compras", date: "14 Dez 2020", total: "R$250,00" },
  { name: "Fiorgio Restaurant", product: "Alimentação", date: "07 Dez 2020", total: "R$319,50" },
  { name: "John Mathew Kayne", product: "Esporte", date: "06 Dez 2020", total: "R$350,00" },
  { name: "Ann Marlin", product: "Compras", date: "31 Nov 2020", total: "R$430,00" },
];
