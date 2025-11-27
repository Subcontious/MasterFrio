'use client';

import React, { JSX, useEffect, useState } from 'react';
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
  Plus,
  Trash2,
  Edit,
  Search as SearchIcon,
} from 'lucide-react';

type UserItem = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  status?: 'Ativo' | 'Inativo' | string;
};

const MENU = [
  { key: 'dashboard', name: 'Dashboard', icon: '/Images/Dashboard.png', path: '/dashboard' },
  { key: 'administrador', name: 'Administrador', icon: '/Images/Admin.png', path: '/administrador' },
  { key: 'central', name: 'Central de Dados', icon: '/Images/Data.png', path: '/central' },
  { key: 'outage', name: 'Outage & OS', icon: '/Images/Outage.png', path: '/outage' },
  { key: 'estoque', name: 'Estoque', icon: '/Images/Package.png', path: '/estoque' },
  { key: 'relatorios', name: 'Relatórios', icon: '/Images/Chart.png', path: '/relatorios' },
  { key: 'settings', name: 'Configurações', icon: '/Images/Settings.png', path: '/configuracoes/admin' },
] as const;

const initialUsers: UserItem[] = [
  { id: 1, nome: 'Carlos Mendes', email: 'carlos@masterfrio.com', cargo: 'Administrador', status: 'Ativo' },
  { id: 2, nome: 'Luciana Alves', email: 'luciana@masterfrio.com', cargo: 'Financeiro', status: 'Ativo' },
  { id: 3, nome: 'Rafael Gomes', email: 'rafael@masterfrio.com', cargo: 'Técnico', status: 'Inativo' },
];

export default function Administrador(): JSX.Element {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UserItem | null>(null);
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [query, setQuery] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    if (!modalOpen) {
      setEditing(null);
      setNome('');
      setEmail('');
      setCargo('');
    }
  }, [modalOpen]);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (u: UserItem) => {
    setEditing(u);
    setNome(u.nome);
    setEmail(u.email);
    setCargo(u.cargo);
    setModalOpen(true);
  };

  const saveUser = () => {
    if (!nome.trim() || !email.trim() || !cargo.trim()) {
      return alert('Preencha nome, email e cargo.');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Email inválido.');

    if (editing) {
      setUsers(prev => prev.map(p => (p.id === editing.id ? { ...p, nome: nome.trim(), email: email.trim(), cargo: cargo.trim() } : p)));
    } else {
      setUsers(prev => [{ id: Date.now(), nome: nome.trim(), email: email.trim(), cargo: cargo.trim(), status: 'Ativo' }, ...prev]);
    }
    setModalOpen(false);
  };

  const removeUser = (id: number) => {
    if (!confirm('Remover usuário?')) return;
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const filtered = users.filter(u => u.nome.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen font-sans p-8 transition-colors duration-500 antialiased bg-background"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="rounded-2xl p-6 flex flex-col justify-between border shadow-sm bg-card border-border">
          <div>
            <div className="flex items-center justify-center mb-8">
              <Link href="/dashboard" aria-label="Home">
                <Image src="/Images/MasterFrio_Logo.png" alt="MasterFrio" width={160} height={40} className="h-10 w-auto" priority />
              </Link>
            </div>

            <nav className="flex flex-col gap-2 text-sm" aria-label="Main navigation">
              {MENU.map(m => (
                <Link
                  key={m.key}
                  href={m.path}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                    m.key === 'administrador' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Image src={m.icon} alt={m.name} width={20} height={20} className="opacity-80" />
                  </div>
                  <span className="font-medium">{m.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors"
              onClick={() => alert('Logout (implemente a lógica real)')}
            >
              <LogOut size={18} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
            <div className="text-xs mt-6 text-center text-muted-foreground">© 2025 Masterfrio</div>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Administrador</h1>
              <p className="text-sm text-muted-foreground mt-1">Gerencie usuários, permissões e configurações administrativas.</p>
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

          {/* Usuários Card */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Usuários Cadastrados</h3>
                <p className="text-sm text-muted-foreground mt-1">Gerencie e edite as contas do sistema.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Buscar por nome ou email..."
                    className="pl-10 pr-3 py-2 rounded-xl border border-border bg-background text-sm w-72"
                    aria-label="Buscar usuários"
                  />
                </div>

                <button
                  onClick={openNew}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} /> Novo Usuário
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground uppercase text-xs tracking-wide border-b border-border">
                  <tr>
                    <th className="pb-3 text-left font-medium">Nome</th>
                    <th className="pb-3 text-left font-medium">E-mail</th>
                    <th className="pb-3 text-left font-medium">Cargo</th>
                    <th className="pb-3 text-right font-medium">Ações</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filtered.length ? (
                    filtered.map(u => (
                      <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                        <td className="py-4 font-medium">{u.nome}</td>
                        <td className="py-4 text-muted-foreground">{u.email}</td>
                        <td className="py-4">{u.cargo}</td>
                        <td className="py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => openEdit(u)}
                              title={`Editar ${u.nome}`}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => removeUser(u.id)}
                              title={`Remover ${u.nome}`}
                              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-muted-foreground">
                        Nenhum usuário encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Modal: Novo / Editar Usuário */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            aria-modal="true"
            role="dialog"
            aria-label={editing ? 'Editar usuário' : 'Novo usuário'}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{editing ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-md hover:bg-muted">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <input value={nome} onChange={e => setNome(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background" />
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background" />
                </div>

                <div>
                  <label className="text-sm font-medium">Cargo</label>
                  <input value={cargo} onChange={e => setCargo(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors">
                  Cancelar
                </button>
                <button onClick={saveUser} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  {editing ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}