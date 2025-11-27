'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  DollarSign,
  Check,
  TrendingUp,
  Package,
  BarChart3,
} from 'lucide-react';

const MENU = [
  { key: 'dashboard', name: 'Dashboard', icon: '/Images/Dashboard.png', path: '/dashboard' },
  { key: 'administrador', name: 'Administrador', icon: '/Images/Admin.png', path: '/administrador' },
  { key: 'central', name: 'Central de Dados', icon: '/Images/Data.png', path: '/central' },
  { key: 'outage', name: 'Outage & OS', icon: '/Images/Outage.png', path: '/outage' },
  { key: 'estoque', name: 'Estoque', icon: '/Images/Package.png', path: '/estoque' },
  { key: 'relatorios', name: 'Relatórios', icon: '/Images/Chart.png', path: '/relatorios' },
  { key: 'settings', name: 'Configurações', icon: '/Images/Settings.png', path: '/configuracoes/admin' },
] as const;

export default function Relatorios() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem('mf:dark');
      if (v !== null) return JSON.parse(v);
      return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mf:dark', JSON.stringify(darkMode));
    } catch {}
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  const [userOpen, setUserOpen] = useState(false);

  const cards = [
    { title: 'Faturamento Mês', value: 'R$ 184.520', icon: <DollarSign size={28} />, gradient: 'from-emerald-500 to-emerald-600', change: '+12%', positive: true },
    { title: 'Ordens Concluídas', value: '342', icon: <Check size={28} />, gradient: 'from-blue-500 to-blue-600', change: '+8%', positive: true },
    { title: 'Ticket Médio', value: 'R$ 1.280', icon: <TrendingUp size={28} />, gradient: 'from-purple-500 to-purple-600', change: '+5%', positive: true },
    { title: 'Estoque Baixo', value: '18 itens', icon: <Package size={28} />, gradient: 'from-orange-500 to-red-600', change: '-3%', positive: false },
  ];

  const vendas = [
    { data: '13/11', cliente: 'Supermercado Central', servico: 'Instalação Câmara Fria', qtd: 12, total: 'R$ 24.800' },
    { data: '12/11', cliente: 'Restaurante Sabor', servico: 'Manutenção Ar Split', qtd: 5, total: 'R$ 3.200' },
    { data: '11/11', cliente: 'Loja Eletro', servico: 'Troca Compressor', qtd: 8, total: 'R$ 9.400' },
    { data: '10/11', cliente: 'Carlos Mendes', servico: 'Instalação Split 9000BTU', qtd: 3, total: 'R$ 4.200' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen font-sans p-8 transition-colors duration-500 antialiased bg-background"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

        {/* SIDEBAR */}
        <aside className="rounded-2xl p-6 flex flex-col justify-between border shadow-sm bg-card border-border">
          <div>
            <div className="flex items-center justify-center mb-8">
              <Link href="/dashboard">
                <Image src="/Images/MasterFrio_Logo.png" alt="MasterFrio" width={160} height={40} className="h-10 w-auto" priority />
              </Link>
            </div>

            <nav className="flex flex-col gap-2 text-sm">
              {MENU.map(m => {
                const active = m.key === 'relatorios';
                return (
                  <Link
                    key={m.key}
                    href={m.path}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                      active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Image src={m.icon} alt={m.name} width={20} height={20} className="opacity-80" />
                    </div>
                    <span className="font-medium">{m.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-6">
            <button
              onClick={() => alert('Logout')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
            <div className="text-xs mt-6 text-center text-muted-foreground">© 2025 Masterfrio</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Relatórios & Análises</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Visão completa do desempenho financeiro e operacional da empresa
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(d => !d)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-pressed={darkMode}
              >
                {darkMode ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserOpen(s => !s)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <User size={18} className="text-primary" />
                  <span className="text-sm font-medium">Pedro G.</span>
                  <ChevronDown size={16} className={`transition-transform ${userOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute top-[110%] right-0 w-48 rounded-xl shadow-lg border border-border bg-card z-50"
                    >
                      <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-t-xl flex items-center gap-3 text-sm">
                        <User size={16} /> Perfil
                      </button>
                      <button className="w-full text-left px-4 py-3 hover:bg-muted flex items-center gap-3 text-sm">
                        <Settings size={16} /> Configurações
                      </button>
                      <button className="w-full text-left px-4 py-3 hover:bg-destructive/10 rounded-b-xl flex items-center gap-3 text-sm text-destructive">
                        <LogOut size={16} /> Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* CARDS DE MÉTRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br ${c.gradient}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm opacity-90 font-medium">{c.title}</p>
                    <p className="text-3xl font-bold mt-2">{c.value}</p>
                    <p className={`text-sm mt-3 font-medium ${c.positive ? 'text-green-100' : 'text-red-100'}`}>
                      {c.change} vs mês anterior
                    </p>
                  </div>
                  <div className="opacity-90">{c.icon}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TABELA DE VENDAS */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-5">
              Vendas do Mês (Novembro 2025)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground uppercase text-xs tracking-wider border-b border-border">
                  <tr>
                    <th className="text-left py-3">Data</th>
                    <th className="text-left py-3">Cliente</th>
                    <th className="text-left py-3">Serviço</th>
                    <th className="text-center py-3">Itens</th>
                    <th className="text-right py-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {vendas.map((v, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 font-medium">{v.data}</td>
                      <td className="py-4">{v.cliente}</td>
                      <td className="py-4 text-muted-foreground">{v.servico}</td>
                      <td className="py-4 text-center">{v.qtd}</td>
                      <td className="py-4 text-right font-bold text-green-600 dark:text-green-400">
                        {v.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* PLACEHOLDERS PARA GRÁFICOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
              <BarChart3 size={56} className="mx-auto text-primary mb-4 opacity-80" />
              <h3 className="text-lg font-semibold text-foreground">Gráfico de Vendas Mensais</h3>
              <p className="text-sm text-muted-foreground mt-2">
                (Integração com Recharts / Chart.js aqui)
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
              <TrendingUp size={56} className="mx-auto text-emerald-500 mb-4 opacity-80" />
              <h3 className="text-lg font-semibold text-foreground">Crescimento Anual</h3>
              <p className="text-sm text-muted-foreground mt-2">
                (Gráfico de linha com projeção aqui)
              </p>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}