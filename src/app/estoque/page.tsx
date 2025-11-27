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
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Check,
  AlertTriangle,
  Minus,
  PlusCircle,
} from 'lucide-react';
import { useRouter } from "next/navigation";

const MENU = [
  { key: 'dashboard', name: 'Dashboard', icon: '/Images/Dashboard.png', path: '/dashboard' },
  { key: 'administrador', name: 'Administrador', icon: '/Images/Admin.png', path: '/administrador' },
  { key: 'central', name: 'Central de Dados', icon: '/Images/Data.png', path: '/central' },
  { key: 'outage', name: 'Outage & OS', icon: '/Images/Outage.png', path: '/outage' },
  { key: 'estoque', name: 'Estoque', icon: '/Images/Package.png', path: '/estoque' },
  { key: 'relatorios', name: 'Relatórios', icon: '/Images/Chart.png', path: '/relatorios' },
  { key: 'settings', name: 'Configurações', icon: '/Images/Settings.png', path: '/configuracoes/admin' },
] as const;

type Item = {
  id: number;
  nome: string;
  codigo: string;
  quantidade: number;
  minimo: number;
  precoCusto: number;
  precoVenda: number;
  categoria: string;
};

export default function Estoque() {
  const router = useRouter();
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
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const [items, setItems] = useState<Item[]>([
    { id: 1, nome: 'Compressor 9000 BTU', codigo: 'CMP9000', quantidade: 45, minimo: 10, precoCusto: 620, precoVenda: 980, categoria: 'Compressores' },
    { id: 2, nome: 'Evaporadora Split', codigo: 'EVA12K', quantidade: 8, minimo: 15, precoCusto: 1200, precoVenda: 1890, categoria: 'Evaporadoras' },
    { id: 3, nome: 'Cobre 1/4 - 3/8', codigo: 'COB1438', quantidade: 120, minimo: 50, precoCusto: 48, precoVenda: 78, categoria: 'Tubos' },
    { id: 4, nome: 'Capacitor 35uF', codigo: 'CAP35', quantidade: 3, minimo: 20, precoCusto: 28, precoVenda: 55, categoria: 'Componentes' },
  ]);

  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [minimo, setMinimo] = useState('');
  const [precoCusto, setPrecoCusto] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [categoria, setCategoria] = useState('Peças');

  const filtered = items.filter(i =>
    i.nome.toLowerCase().includes(search.toLowerCase()) ||
    i.codigo.toLowerCase().includes(search.toLowerCase())
  );

  const ajustarQuantidade = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantidade: Math.max(0, i.quantidade + delta) } : i
      )
    );
  };

  const openEdit = (item: Item) => {
    setEditItem(item);
    setNome(item.nome);
    setCodigo(item.codigo);
    setQuantidade(String(item.quantidade));
    setMinimo(String(item.minimo));
    setPrecoCusto(String(item.precoCusto));
    setPrecoVenda(String(item.precoVenda));
    setCategoria(item.categoria);
    setModalOpen(true);
  };

  const resetForm = () => {
    setNome('');
    setCodigo('');
    setQuantidade('');
    setMinimo('');
    setPrecoCusto('');
    setPrecoVenda('');
    setCategoria('Peças');
    setEditItem(null);
  };

  const handleSave = () => {
    if (!nome.trim() || !codigo.trim() || !quantidade || !minimo) {
      alert('Preencha pelo menos nome, código, quantidade e mínimo');
      return;
    }

    if (editItem) {
      setItems(prev =>
        prev.map(i =>
          i.id === editItem.id
            ? {
                ...i,
                nome,
                codigo,
                quantidade: Number(quantidade),
                minimo: Number(minimo),
                precoCusto: Number(precoCusto || 0),
                precoVenda: Number(precoVenda || 0),
                categoria,
              }
            : i
        )
      );
    } else {
      setItems(prev => [
        ...prev,
        {
          id: Date.now(),
          nome,
          codigo,
          quantidade: Number(quantidade),
          minimo: Number(minimo),
          precoCusto: Number(precoCusto || 0),
          precoVenda: Number(precoVenda || 0),
          categoria,
        },
      ]);
    }
    setModalOpen(false);
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
                const active = m.key === 'estoque';
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
              onClick={() => router.push("/")}
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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Controle de Estoque</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie produtos, ajuste quantidades e monitore estoque mínimo
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

          {/* CARD PRINCIPAL */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar por nome ou código..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                onClick={() => { resetForm(); setModalOpen(true); }}
                className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                <Plus size={18} />
                Novo Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground uppercase text-xs tracking-wider border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2">Código</th>
                    <th className="text-left py-3 px-2">Produto</th>
                    <th className="text-center py-3 px-2">Categoria</th>
                    <th className="text-center py-3 px-2">Qtd</th>
                    <th className="text-center py-3 px-2">Mínimo</th>
                    <th className="text-center py-3 px-2">Custo</th>
                    <th className="text-center py-3 px-2">Venda</th>
                    <th className="text-center py-3 px-2">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map(item => {
                    const estoqueBaixo = item.quantidade <= item.minimo;
                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-muted/30 transition-colors ${estoqueBaixo ? 'bg-red-50/50 dark:bg-red-900/20' : ''}`}
                      >
                        <td className="py-4 px-2 font-medium">{item.codigo}</td>
                        <td className="py-4 px-2">{item.nome}</td>
                        <td className="py-4 px-2 text-center text-xs text-muted-foreground">{item.categoria}</td>
                        <td className="py-4 px-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => ajustarQuantidade(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-800/60 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className={`w-12 text-center font-bold ${estoqueBaixo ? 'text-red-600 dark:text-red-400' : ''}`}>
                              {item.quantidade}
                            </span>
                            <button
                              onClick={() => ajustarQuantidade(item.id, +1)}
                              className="w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-800/60 transition-colors"
                            >
                              <PlusCircle size={14} />
                            </button>
                            {estoqueBaixo && <AlertTriangle size={16} className="text-red-600 dark:text-red-400" />}
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center text-muted-foreground">{item.minimo}</td>
                        <td className="py-4 px-2 text-center">R$ {item.precoCusto.toFixed(2)}</td>
                        <td className="py-4 px-2 text-center font-semibold text-green-600 dark:text-green-400">
                          R$ {item.precoVenda.toFixed(2)}
                        </td>
                        <td className="py-4 px-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEdit(item)}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-3xl p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {editItem ? 'Editar Item' : 'Novo Item no Estoque'}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Nome do produto</label>
                  <input
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ex: Compressor 12000 BTU"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Código</label>
                  <input
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ex: CMP12000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Quantidade atual</label>
                  <input
                    type="number"
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estoque mínimo</label>
                  <input
                    type="number"
                    value={minimo}
                    onChange={e => setMinimo(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preço de custo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={precoCusto}
                    onChange={e => setPrecoCusto(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preço de venda</label>
                  <input
                    type="number"
                    step="0.01"
                    value={precoVenda}
                    onChange={e => setPrecoVenda(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <select
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Peças</option>
                    <option>Equipamentos</option>
                    <option>Tubos</option>
                    <option>Ferramentas</option>
                    <option>Componentes</option>
                    <option>Compressores</option>
                    <option>Evaporadoras</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
                >
                  <Check size={18} />
                  {editItem ? 'Salvar Alterações' : 'Adicionar Item'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}