'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User, Settings, LogOut, ChevronDown, Sun, Moon,
  Package, Plus, Search, Edit, Trash2, X, Check, AlertTriangle
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
  const [darkMode, setDarkMode] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const [items, setItems] = useState<Item[]>([
    { id: 1, nome: "Compressor 9000 BTU", codigo: "CMP9000", quantidade: 45, minimo: 10, precoCusto: 620, precoVenda: 980, categoria: "Compressores" },
    { id: 2, nome: "Evaporadora Split", codigo: "EVA12K", quantidade: 8, minimo: 15, precoCusto: 1200, precoVenda: 1890, categoria: "Evaporadoras" },
    { id: 3, nome: "Cobre 1/4 - 3/8", codigo: "COB1438", quantidade: 120, minimo: 50, precoCusto: 48, precoVenda: 78, categoria: "Tubos" },
    { id: 4, nome: "Capacitor 35uF", codigo: "CAP35", quantidade: 3, minimo: 20, precoCusto: 28, precoVenda: 55, categoria: "Componentes" },
  ]);

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [minimo, setMinimo] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [categoria, setCategoria] = useState("Peças");

  const filtered = items.filter(i => 
    i.nome.toLowerCase().includes(search.toLowerCase()) ||
    i.codigo.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!nome || !codigo || !quantidade || !minimo) return;

    if (editItem) {
      setItems(prev => prev.map(i => i.id === editItem.id ? {
        ...i, nome, codigo, quantidade: Number(quantidade),
        minimo: Number(minimo), precoCusto: Number(precoCusto), precoVenda: Number(precoVenda), categoria
      } : i));
    } else {
      setItems(prev => [...prev, {
        id: Date.now(), nome, codigo, quantidade: Number(quantidade),
        minimo: Number(minimo), precoCusto: Number(precoCusto || 0), precoVenda: Number(precoVenda || 0), categoria
      }]);
    }
    setModalOpen(false);
    setNome(""); setCodigo(""); setQuantidade(""); setMinimo(""); setPrecoCusto(""); setPrecoVenda(""); setCategoria("Peças");
    setEditItem(null);
  };

  const ajustarQuantidade = (id: number, delta: number) => {
    setItems(prev => prev.map(i => 
      i.id === id ? { ...i, quantidade: Math.max(0, i.quantidade + delta) } : i
    ));
  };

  const openEdit = (item: Item) => {
    setEditItem(item);
    setNome(item.nome); setCodigo(item.codigo); setQuantidade(String(item.quantidade));
    setMinimo(String(item.minimo)); setPrecoCusto(String(item.precoCusto)); setPrecoVenda(String(item.precoVenda));
    setCategoria(item.categoria);
    setModalOpen(true);
  };

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
                    m.key === "estoque"
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
              <h1 className={`text-2xl font-bold tracking-tight ${darkMode ? "text-blue-200" : "text-blue-700"}`}>Controle de Estoque</h1>
              <p className={`text-sm ${darkMode ? "text-blue-300/70" : "text-blue-500"}`}>Gerencie produtos, ajuste quantidades e acompanhe estoque mínimo</p>
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
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-blue-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou código..." className="pl-10 pr-4 py-3 rounded-xl border w-96 focus:ring-2 focus:ring-blue-300 outline-none" />
              </div>
              <button onClick={() => { setNome(""); setCodigo(""); setQuantidade(""); setMinimo(""); setPrecoCusto(""); setPrecoVenda(""); setCategoria("Peças"); setEditItem(null); setModalOpen(true); }} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow hover:shadow-xl transition">
                <Plus size={18} /> Novo Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-blue-600 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="text-left py-3">Código</th>
                    <th className="text-left py-3">Produto</th>
                    <th className="text-center py-3">Categoria</th>
                    <th className="text-center py-3">Qtd</th>
                    <th className="text-center py-3">Mínimo</th>
                    <th className="text-center py-3">Custo</th>
                    <th className="text-center py-3">Venda</th>
                    <th className="text-center py-3">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {filtered.map(item => (
                    <tr key={item.id} className={`hover:bg-blue-50/5 transition ${item.quantidade <= item.minimo ? "bg-red-50 dark:bg-red-900/20" : ""}`}>
                      <td className="py-3 font-medium">{item.codigo}</td>
                      <td className="py-3">{item.nome}</td>
                      <td className="py-3 text-center text-xs">{item.categoria}</td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => ajustarQuantidade(item.id, -1)} className="w-8 h-8 rounded bg-red-100 text-red-600 hover:bg-red-200">-</button>
                          <span className="w-14 text-center font-bold">{item.quantidade}</span>
                          <button onClick={() => ajustarQuantidade(item.id, +1)} className="w-8 h-8 rounded bg-green-100 text-green-600 hover:bg-green-200">+</button>
                          {item.quantidade <= item.minimo && <AlertTriangle size={16} className="text-red-500" />}
                        </div>
                      </td>
                      <td className="py-3 text-center">{item.minimo}</td>
                      <td className="py-3 text-center">R$ {item.precoCusto.toFixed(2)}</td>
                      <td className="py-3 text-center font-semibold text-green-600">R$ {item.precoVenda.toFixed(2)}</td>
                      <td className="py-3 text-center flex justify-center gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 hover:bg-blue-100 rounded"><Edit size={15} className="text-blue-600" /></button>
                        <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="p-2 hover:bg-red-100 rounded"><Trash2 size={15} className="text-red-600" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setModalOpen(false)} />
            <div className={`relative w-full max-w-2xl rounded-2xl p-8 shadow-xl ${darkMode ? "bg-[#071226] text-white" : "bg-white"}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editItem ? "Editar Item" : "Novo Item"}</h2>
                <button onClick={() => setModalOpen(false)}><X size={24} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)} className="col-span-2 border rounded-lg px-4 py-3" />
                <input placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} className="border rounded-lg px-4 py-3" />
                <input type="number" placeholder="Quantidade atual" value={quantidade} onChange={e => setQuantidade(e.target.value)} className="border rounded-lg px-4 py-3" />
                <input type="number" placeholder="Estoque mínimo" value={minimo} onChange={e => setMinimo(e.target.value)} className="border rounded-lg px-4 py-3" />
                <input type="number" placeholder="Preço custo" value={precoCusto} onChange={e => setPrecoCusto(e.target.value)} className="border rounded-lg px-4 py-3" />
                <input type="number" placeholder="Preço venda" value={precoVenda} onChange={e => setPrecoVenda(e.target.value)} className="border rounded-lg px-4 py-3" />
                <select value={categoria} onChange={e => setCategoria(e.target.value)} className="border rounded-lg px-4 py-3">
                  <option>Peças</option>
                  <option>Equipamentos</option>
                  <option>Tubos</option>
                  <option>Ferramentas</option>
                  <option>Componentes</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => setModalOpen(false)} className="px-6 py-3 border rounded-xl">Cancelar</button>
                <button onClick={handleSave} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl flex items-center gap-2">
                  <Check size={18} /> Salvar Item
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}