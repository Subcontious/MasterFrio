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
  Database,
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

export default function CentralDados() {
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
    { title: 'Faturamento do Mês', value: 'R$ 84.200', icon: <BarChart3 size={24} /> },
    { title: 'Ordens Concluídas', value: '128', icon: <Wrench size={24} /> },
    { title: 'Clientes Ativos', value: '234', icon: <Users size={24} /> },
    { title: 'Estoque Baixo', value: '12 itens', icon: <Package size={24} /> },
  ];

  const statusCards = [
    { title: 'Conector ERP', value: 'Conectado', hint: 'Sincronização ok' },
    { title: 'Último backup', value: '22/11/2025 10:05', hint: 'Agendado diariamente' },
    { title: 'Fila de sincronização', value: '0 itens', hint: 'Sem pendências' },
  ];

  const logs = [
    '22/11/2025 14:30 – Sincronização com ERP concluída',
    '22/11/2025 10:05 – Backup automático executado',
    '22/11/2025 09:12 – Importação de clientes finalizada',
    '21/11/2025 23:40 – Integração com distribuidor concluída',
    '21/11/2025 22:01 – Backup agendado executado',
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
              <Link href="/dashboard" aria-label="Home">
                <Image
                  src="/Images/MasterFrio_Logo.png"
                  alt="MasterFrio"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            <nav className="flex flex-col gap-2 text-sm">
              {MENU.map(m => {
                const active = m.key === 'central';
                return (
                  <Link
                    key={m.key}
                    href={m.path}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Central de Dados</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Monitoramento de integrações, backups e sincronizações em tempo real.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(d => !d)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-pressed={darkMode}
                aria-label="Alternar tema"
              >
                {darkMode ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
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
                      role="menu"
                    >
                      <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-t-xl flex items-center gap-3 text-sm" role="menuitem">
                        <User size={16} /> Perfil
                      </button>
                      <button className="w-full text-left px-4 py-3 hover:bg-muted flex items-center gap-3 text-sm" role="menuitem">
                        <Settings size={16} /> Configurações
                      </button>
                      <button className="w-full text-left px-4 py-3 hover:bg-destructive/10 rounded-b-xl flex items-center gap-3 text-sm text-destructive" role="menuitem">
                        <LogOut size={16} /> Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* CONTEÚDO PRINCIPAL */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.18 }}
                    className="p-5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-xs opacity-90 font-medium">{c.title}</div>
                      <div className="opacity-80">{c.icon}</div>
                    </div>
                    <div className="text-3xl font-bold">{c.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Logs + Status */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Logs do Sistema</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-muted-foreground uppercase text-xs tracking-wide border-b border-border">
                        <tr>
                          <th className="pb-3 text-left font-medium">Data/Hora</th>
                          <th className="pb-3 text-left font-medium">Evento</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {logs.map((log, i) => {
                          const [date, event] = log.split(' – ');
                          return (
                            <tr key={i} className="hover:bg-muted/50 transition-colors">
                              <td className="py-4 text-muted-foreground">{date}</td>
                              <td className="py-4 font-medium">{event}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>

                <aside className="space-y-4">
                  <div className="p-5 rounded-xl border border-border bg-muted/30">
                    <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-3">
                      <Database size={20} className="text-primary" />
                      Status em Tempo Real
                    </h4>
                    <div className="flex flex-col gap-5">
                      {statusCards.map((s, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600" />
                            <div>
                              <div className="text-sm font-medium">{s.title}</div>
                              <div className="text-xs text-muted-foreground">{s.hint}</div>
                            </div>
                          </div>
                          <div className={`text-sm font-semibold ${s.value.includes('Conectado') || s.value === '0 itens' ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                            {s.value}
                          </div>
                        </div>
                      ))}
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