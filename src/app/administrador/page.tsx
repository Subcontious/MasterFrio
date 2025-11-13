'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User, Settings, LogOut, ChevronDown, Sun, Moon,
  Shield, UserPlus, Search, Edit, Trash2, Plus, X, Check
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

export default function Administrador() {
  const [darkMode, setDarkMode] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, nome: "Carlos Mendes", cargo: "Administrador", status: "Ativo", ultimoLogin: "10/11/2025 14:22", email: "carlos@masterfrio.com" },
    { id: 2, nome: "Luciana Alves", cargo: "Financeiro", status: "Ativo", ultimoLogin: "09/11/2025 19:40", email: "luciana@masterfrio.com" },
  ]);

  const [admins, setAdmins] = useState([
    { id: 101, nome: "Carlos Mendes", cargo: "Administrador", status: "Ativo", ultimoLogin: "10/11/2025 14:22", email: "carlos@masterfrio.com" },
  ]);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(users);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);

  const [nomeUser, setNomeUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [cargoUser, setCargoUser] = useState("Atendente");

  const [nomeAdmin, setNomeAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [senhaAdmin, setSenhaAdmin] = useState("");

  useEffect(() => {
    setFiltered(users.filter(u => u.nome.toLowerCase().includes(search.toLowerCase())));
  }, [users, search]);

  const handleDelete = (id: number) => {
    if (confirm("Remover usuário?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setAdmins(prev => prev.filter(a => a.id !== id));
    }
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

        {/* SIDEBAR (Mudar dps) */}
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
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                    m.key === "administrador"
                      ? darkMode ? "bg-[#243459] text-blue-100 shadow-inner border border-[#2e3a5f]"
                      : "bg-blue-50 text-blue-700 shadow-inner border border-blue-100"
                      : darkMode ? "text-blue-100 hover:bg-[#243459]" : "text-[#1a2740] hover:bg-blue-50"
                  }`}>
                  <div className="w-5 h-5"><Image src={m.icon} alt="" width={20} height={20} /></div>
                  <span className="font-medium">{m.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-6"></div>
        </aside>

        {/* MAIN + HEADER (igual, mudar dps) */}
        <main className="space-y-6">
          <header className="flex items-center justify-between"></header>

          <section className={`bg-white border rounded-2xl p-6 shadow-sm ${darkMode ? "bg-[#0f1724]/60 border-[#223054]" : "border-[#e3edff]"}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Shield size={18} className="text-blue-600" />
                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Usuários Cadastrados</div>
                    <div className="text-xs text-blue-500">Gerencie contas, permissões e atividade</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-3 top-2.5 text-blue-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuário..." className="pl-10 pr-3 py-2 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-300 text-sm" />
                  </div>
                  <button onClick={() => setOpenAddUser(true)} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl">
                    <UserPlus size={16} /> Adicionar
                  </button>
                  <button onClick={() => setOpenAddAdmin(true)} className="flex items-center gap-2 border px-4 py-2 rounded-xl">
                    <Plus size={16} /> Cadastrar Admin
                  </button>
                </div>
              </div>

              <div className={`rounded-xl border ${darkMode ? "border-[#223054]/40 bg-[#061025]/30" : "border-blue-100 bg-white"} p-4`}>
                <table className="w-full text-sm">
                  <thead className="text-blue-500 uppercase text-xs tracking-wide">
                    <tr><th className="pb-2 text-left">Nome</th><th className="pb-2 text-left">Cargo</th><th className="pb-2 text-left">Status</th><th className="pb-2 text-left">Último Login</th><th className="pb-2 text-right">Ações</th></tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50">
                    {filtered.map(u => (
                      <tr key={u.id} className="hover:bg-blue-50/30">
                        <td className="py-2 font-medium">{u.nome}</td>
                        <td className="py-2">{u.cargo}</td>
                        <td className="py-2"><span className={`px-2 py-1 rounded-md text-xs ${u.status === "Ativo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{u.status}</span></td>
                        <td className="py-2 text-blue-600">{u.ultimoLogin}</td>
                        <td className="py-2 text-right flex justify-end gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-md"><Edit size={14} className="text-blue-600" /></button>
                          <button onClick={() => handleDelete(u.id)} className="p-2 hover:bg-red-100 rounded-md"><Trash2 size={14} className="text-red-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {openAddUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpenAddUser(false)} />
            <div className={`relative bg-white rounded-2xl p-6 shadow-xl max-w-md w-full ${darkMode ? "bg-[#071226] text-white" : ""}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded"><UserPlus size={20} className="text-blue-600" /></div>
                  <div>Adicionar Usuário</div>
                </div>
                <button onClick={() => setOpenAddUser(false)}><X size={18} /></button>
              </div>
              <input placeholder="Nome" value={nomeUser} onChange={e => setNomeUser(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-2" />
              <input placeholder="Email" value={emailUser} onChange={e => setEmailUser(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-2" />
              <select value={cargoUser} onChange={e => setCargoUser(e.target.value)} className="w-full border rounded-md px-3 py-2">
                <option>Atendente</option><option>Técnico</option><option>Financeiro</option><option>Vendedor</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setOpenAddUser(false)} className="px-4 py-2 border rounded-xl">Cancelar</button>
                <button onClick={() => {
                  setUsers(prev => [{ id: Date.now(), nome: nomeUser, email: emailUser, cargo: cargoUser, status: "Ativo", ultimoLogin: "—" }, ...prev]);
                  setOpenAddUser(false); setNomeUser(""); setEmailUser(""); 
                }} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl">Criar</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}