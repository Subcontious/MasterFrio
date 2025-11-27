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
  AlertTriangle,
  Plus,
  X,
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

type Outage = {
  id: number;
  area: string;
  endereco: string;
  impacto: string;
  status: string;
  hora: string;
  data: string;
  horario: string;
};

export default function OutageOs() {
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
  const [openAddOS, setOpenAddOS] = useState(false);

  const [outages, setOutages] = useState<Outage[]>([
    {
      id: 1,
      area: 'Loja Centro',
      endereco: 'Av. Principal, 123',
      impacto: 'Alto',
      status: 'Em andamento',
      hora: '11:10',
      data: '2025-11-13',
      horario: '11:00',
    },
  ]);

  const [step, setStep] = useState(1);
  const [endereco, setEndereco] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [impacto, setImpacto] = useState('Médio');

  const resetForm = () => {
    setEndereco('');
    setData('');
    setHorario('');
    setImpacto('Médio');
    setStep(1);
  };

  const handleCreateOS = () => {
    const novaOS: Outage = {
      id: Date.now(),
      area: endereco || 'Local não informado',
      endereco,
      impacto,
      status: 'Pendente',
      hora: horario,
      data,
      horario,
    };
    setOutages(prev => [novaOS, ...prev]);
    setOpenAddOS(false);
    resetForm();
  };

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
                const active = m.key === 'outage';
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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Outage & Ordens de Serviço</h1>
              <p className="text-sm text-muted-foreground mt-1">Gerencie incidentes críticos e crie ordens de atendimento</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(d => !d)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Alternar tema"
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

          {/* CARD PRINCIPAL */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <AlertTriangle size={24} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Incidentes Ativos</h2>
                  <p className="text-sm text-muted-foreground">Acompanhe e gerencie ordens de serviço críticas</p>
                </div>
              </div>

              <button
                onClick={() => { setOpenAddOS(true); resetForm(); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                <Plus size={18} />
                Criar OS
              </button>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs tracking-wider">
                  <tr>
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Local</th>
                    <th className="text-left py-3 px-4">Impacto</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Horário</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {outages.map(o => (
                    <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 font-medium">#{o.id}</td>
                      <td className="py-4 px-4">{o.endereco || o.area}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          o.impacto === 'Alto' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                          o.impacto === 'Médio' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' :
                          'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        }`}>
                          {o.impacto}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          o.status === 'Em andamento' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                          o.status === 'Pendente' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                          'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-muted-foreground">{o.horario || o.hora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* MODAL CRIAR OS */}
      <AnimatePresence>
        {openAddOS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setOpenAddOS(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                    <AlertTriangle size={22} className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Criar Ordem de Serviço</h3>
                </div>
                <button onClick={() => setOpenAddOS(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4].map(s => (
                  <div
                    key={s}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step >= s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {step === 1 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Endereço completo</label>
                    <input
                      value={endereco}
                      onChange={e => setEndereco(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Ex: Av. Paulista, 1578 - São Paulo"
                    />
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Data do atendimento</label>
                    <input
                      type="date"
                      value={data}
                      onChange={e => setData(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                )}
                {step === 3 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Horário</label>
                      <input
                        type="time"
                        value={horario}
                        onChange={e => setHorario(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nível de impacto</label>
                      <select
                        value={impacto}
                        onChange={e => setImpacto(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="Baixo">Baixo</option>
                        <option value="Médio">Médio</option>
                        <option value="Alto">Alto</option>
                      </select>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                    <h4 className="font-medium text-foreground">Confirme os dados:</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p><strong>Endereço:</strong> {endereco || 'Não informado'}</p>
                      <p><strong>Data:</strong> {data || 'Não selecionada'}</p>
                      <p><strong>Horário:</strong> {horario || 'Não definido'}</p>
                      <p><strong>Impacto:</strong> <span className={impacto === 'Alto' ? 'text-red-600' : impacto === 'Médio' ? 'text-yellow-600' : 'text-green-600'}>{impacto}</span></p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-8">
                <span className="text-sm text-muted-foreground">Passo {step} de 4</span>
                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="px-5 py-2.5 border border-border rounded-xl hover:bg-muted transition-colors"
                    >
                      Voltar
                    </button>
                  )}
                  {step < 4 && (
                    <button
                      onClick={() => setStep(s => s + 1)}
                      className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                    >
                      Próximo
                    </button>
                  )}
                  {step === 4 && (
                    <button
                      onClick={handleCreateOS}
                      className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all font-medium shadow-lg"
                    >
                      Registrar OS
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}