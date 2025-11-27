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
  BarChart3,
  Wrench,
  Users,
  Package,
  ArrowUpRight,
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

export default function Dashboard() {
  // Dark mode com inicialização segura (evita hydration error)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('mf:dark');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('mf:dark', JSON.stringify(darkMode));
    } catch {}
  }, [darkMode]);

  const [userOpen, setUserOpen] = useState(false);

  const cards = [
    { title: 'Faturamento do Mês', value: 'R$ 84.200', icon: <BarChart3 size={28} />, gradient: 'from-emerald-500 to-emerald-600' },
    { title: 'Ordens Concluídas', value: '128', icon: <Wrench size={28} />, gradient: 'from-blue-500 to-blue-600' },
    { title: 'Clientes Ativos', value: '234', icon: <Users size={28} />, gradient: 'from-violet-500 to-purple-600' },
    { title: 'Estoque Baixo', value: '12 itens', icon: <Package size={28} />, gradient: 'from-orange-500 to-red-600' },
  ];

  const recentOrders = [
    { cliente: 'Carlos Mendes', servico: 'Instalação Split 9000BTU', status: 'Concluído', valor: 'R$ 1.200' },
    { cliente: 'Loja FrioTec', servico: 'Manutenção preventiva', status: 'Em andamento', valor: 'R$ 850' },
    { cliente: 'Luciana Alves', servico: 'Troca de compressor', status: 'Pendente', valor: 'R$ 1.400' },
  ];

  const technicians = [
    { nome: 'Eduardo Lima', especialidade: 'Instalação', status: 'Em campo', color: 'from-blue-500 to-blue-600' },
    { nome: 'Rafael Gomes', especialidade: 'Manutenção', status: 'Disponível', color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
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
                const active = m.key === 'dashboard';
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
              onClick={() => alert('Logout implementado!')}
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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Visão geral financeira, ordens de serviço e equipe em tempo real
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(d => !d)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Alternar tema claro/escuro"
              >
                {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-muted-foreground" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserOpen(s => !s)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={userOpen}
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

          {/* CARDS PRINCIPAIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 font-medium">{card.title}</p>
                    <p className="text-3xl font-bold mt-2">{card.value}</p>
                  </div>
                  <div className="opacity-90">{card.icon}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SEÇÃO INFERIOR */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-5">Ordens de Serviço Recentes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-muted-foreground uppercase text-xs tracking-wider border-b border-border">
                    <tr>
                      <th className="text-left py-3">Cliente</th>
                      <th className="text-left py-3">Serviço</th>
                      <th className="text-left py-3">Status</th>
                      <th className="text-right py-3">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="py-4 font-medium">{order.cliente}</td>
                        <td className="py-4 text-muted-foreground">{order.servico}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Concluído' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            order.status === 'Em andamento' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right font-semibold text-primary">{order.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-5">Técnicos Online</h3>
              <div className="space-y-5">
                {technicians.map((tech, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tech.color} shadow-md`} />
                      <div>
                        <div className="font-medium text-foreground">{tech.nome}</div>
                        <div className="text-sm text-muted-foreground">{tech.especialidade}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${tech.status === 'Em campo' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>
                      {tech.status}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </motion.div>
  );
}