'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
  Shield,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Database,
  AlertTriangle,
  Sliders,
  Plus,
  Check,
  X
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                            TYPES & CONSTANTS                                */
/* -------------------------------------------------------------------------- */
type ViewKey = "home" | "dashboard" | "administrador" | "central" | "outage" | "settings";

const MENU = [
  { key: "dashboard", name: "Dashboard", icon: "/Images/Dashboard.png" },
  { key: "administrador", name: "Administrador", icon: "/Images/Admin.png" },
  { key: "central", name: "Central de Dados", icon: "/Images/Data.png" },
  { key: "outage", name: "Outage & OS", icon: "/Images/Outage.png" },
  { key: "settings", name: "Configurações", icon: "/Images/Settings.png" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                        */
/* -------------------------------------------------------------------------- */
export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [view, setView] = useState<ViewKey>("home");

  // Global data (in-memory)
  const [users, setUsers] = useState<UserItem[]>([
    { id: 1, nome: "Carlos Mendes", cargo: "Administrador", status: "Ativo", ultimoLogin: "10/11/2025 14:22", email: "carlos@masterfrio.com" },
    { id: 2, nome: "Luciana Alves", cargo: "Financeiro", status: "Ativo", ultimoLogin: "09/11/2025 19:40", email: "luciana@masterfrio.com" },
  ]);

  const [admins, setAdmins] = useState<UserItem[]>([
    { id: 101, nome: "Carlos Mendes", cargo: "Administrador", status: "Ativo", ultimoLogin: "10/11/2025 14:22", email: "carlos@masterfrio.com" },
  ]);

  const [outages, setOutages] = useState<OutageItem[]>([
    { id: 1, area: "Loja Centro", impacto: "Alto", status: "Em andamento", hora: "11:10", endereco: "Av. Principal, 123", data: "2025-11-10", horario: "11:00" },
  ]);

  // Modal state
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [openAddOS, setOpenAddOS] = useState(false);

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
        <Sidebar darkMode={darkMode} view={view} setView={setView} />
        <MainContent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userOpen={userOpen}
          setUserOpen={setUserOpen}
          view={view}
          setView={setView}
          users={users}
          setUsers={setUsers}
          admins={admins}
          setAdmins={setAdmins}
          outages={outages}
          setOutages={setOutages}
          openAddUser={openAddUser}
          setOpenAddUser={setOpenAddUser}
          openAddAdmin={openAddAdmin}
          setOpenAddAdmin={setOpenAddAdmin}
          openAddOS={openAddOS}
          setOpenAddOS={setOpenAddOS}
        />
      </div>

      {/* Modals placed at root so overlay covers entire layout */}
      <AnimatePresence>
        {openAddUser && (
          <ModalBase onClose={() => setOpenAddUser(false)}>
            <AddUserModal
              darkMode={darkMode}
              onClose={() => setOpenAddUser(false)}
              onCreate={(u) => setUsers((prev) => [{ ...u, id: Date.now() }, ...prev])}
            />
          </ModalBase>
        )}

        {openAddAdmin && (
          <ModalBase onClose={() => setOpenAddAdmin(false)}>
            <AddAdminModal
              darkMode={darkMode}
              onClose={() => setOpenAddAdmin(false)}
              onCreate={(a) => {
                setAdmins((prev) => [{ ...a, id: Date.now() }, ...prev]);
                // Also add to users list for consistency
                setUsers((prev) => [{ ...a, id: Date.now() }, ...prev]);
              }}
            />
          </ModalBase>
        )}

        {openAddOS && (
          <ModalBase onClose={() => setOpenAddOS(false)}>
            <AddOSModal
              darkMode={darkMode}
              onClose={() => setOpenAddOS(false)}
              onCreate={(os) => setOutages((prev) => [{ ...os, id: Date.now() }, ...prev])}
            />
          </ModalBase>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                     */
/* -------------------------------------------------------------------------- */
type UserItem = {
  id: number;
  nome: string;
  cargo: string;
  status: string;
  ultimoLogin?: string;
  email?: string;
};

type OutageItem = {
  id: number;
  area: string;
  impacto: string;
  status: string;
  hora: string;
  endereco?: string;
  data?: string;
  horario?: string;
};

/* -------------------------------------------------------------------------- */
/*                                  SIDEBAR                                    */
/* -------------------------------------------------------------------------- */
function Sidebar({
  darkMode,
  view,
  setView,
}: {
  darkMode: boolean;
  view: ViewKey;
  setView: (v: ViewKey) => void;
}) {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`rounded-2xl p-6 flex flex-col justify-between border shadow-[0_6px_30px_rgba(0,0,0,0.06)] ${
        darkMode ? "bg-[#19233b]/60 border-[#2a3658]" : "bg-gradient-to-br from-[#ffffff] to-[#f0f6ff] border-[#e2ecff]"
      }`}
    >
      <div>
        <div className="flex items-center justify-center mb-6">
          <a href="#">
            <Image src="/Images/MasterFrio_Logo.png" alt="MasterFrio Logo" width={160} height={40} className="h-10 w-auto" priority />
          </a>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {MENU.map((m) => {
            const active = view === (m.key as ViewKey);
            return (
              <button
                key={m.name}
                onClick={() => setView(m.key as ViewKey)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                  active
                    ? darkMode
                      ? "bg-[#243459] text-blue-100 shadow-inner border border-[#2e3a5f]"
                      : "bg-blue-50 text-blue-700 shadow-inner border border-blue-100"
                    : darkMode
                    ? "text-blue-100 hover:bg-[#243459]"
                    : "text-[#1a2740] hover:bg-blue-50"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Image src={m.icon} alt={`${m.name} ícone`} width={20} height={20} className="opacity-90" />
                </div>
                <span className="font-medium">{m.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${darkMode ? "bg-blue-500/10 border-blue-800 text-blue-300 hover:bg-blue-500/20" : "bg-blue-500/10 border-blue-100 text-blue-600 hover:bg-blue-500/20"}`}>
          <LogOut size={18} />
          <span className="text-sm font-semibold">Logout</span>
        </button>

        <div className={`text-[12px] mt-6 text-center ${darkMode ? "text-blue-400/60" : "text-[#7b8cbf]"}`}>© 2025 Masterfrio</div>
      </div>
    </motion.aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                                MAIN CONTENT                                 */
/* -------------------------------------------------------------------------- */
function MainContent({
  darkMode,
  setDarkMode,
  userOpen,
  setUserOpen,
  view,
  setView,
  users,
  setUsers,
  admins,
  setAdmins,
  outages,
  setOutages,
  openAddUser,
  setOpenAddUser,
  openAddAdmin,
  setOpenAddAdmin,
  openAddOS,
  setOpenAddOS,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  userOpen: boolean;
  setUserOpen: (b: boolean) => void;
  view: ViewKey;
  setView: (v: ViewKey) => void;
  users: UserItem[];
  setUsers: (u: UserItem[]) => void;
  admins: UserItem[];
  setAdmins: (a: UserItem[]) => void;
  outages: OutageItem[];
  setOutages: (o: OutageItem[]) => void;
  openAddUser: boolean;
  setOpenAddUser: (b: boolean) => void;
  openAddAdmin: boolean;
  setOpenAddAdmin: (b: boolean) => void;
  openAddOS: boolean;
  setOpenAddOS: (b: boolean) => void;
}) {
  return (
    <motion.main initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between relative">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${darkMode ? "text-blue-200" : "text-blue-700"}`}>
            {view === "home" && "Bem-vindo ao Sistema MasterFrio"}
            {view === "dashboard" && "Dashboard Financeiro"}
            {view === "administrador" && "Administrador"}
            {view === "central" && "Central de Dados"}
            {view === "outage" && "Outage & Ordens de Serviço"}
            {view === "settings" && "Configurações"}
          </h1>
          <p className={`text-sm ${darkMode ? "text-blue-300/70" : "text-blue-500"}`}>
            {view === "dashboard" && "Visão geral financeira, ordens e estoque."}
            {view === "administrador" && "Gerencie usuários, permissões e logs."}
            {view === "central" && "Repositório de dados e integrações."}
            {view === "outage" && "Monitore interrupções e crie ordens de serviço."}
            {view === "settings" && "Ajustes do sistema e preferências."}
            {view === "home" && "Use o menu à esquerda para navegar pelas seções."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun size={16} className={`${!darkMode ? "text-yellow-400" : "text-gray-500"}`} />
            <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode" className="px-2">
              <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.35 }}>
                <div className="flex items-center gap-2">{darkMode ? <Moon size={16} /> : <Sun size={16} />}</div>
              </motion.div>
            </button>
            <Moon size={16} className={`${darkMode ? "text-blue-300" : "text-gray-400"}`} />
          </div>

          {/* USER PANEL */}
          <div className="relative">
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => setUserOpen(!userOpen)} className={`relative bg-blue-50 dark:bg-[#243459] px-4 py-2 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${darkMode ? "text-white" : "text-[#1a2740]"}`}>
              <User size={18} className="text-blue-600 dark:text-blue-300" />
              <span className="text-sm font-medium">Pedro G.</span>
              <ChevronDown size={16} className={`transition-transform ${userOpen ? "rotate-180" : "rotate-0"}`} />
            </motion.button>

            {userOpen && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className={`absolute top-[110%] right-0 w-48 rounded-xl shadow-lg overflow-hidden border ${darkMode ? "bg-[#1b2540] border-[#2a3658]" : "bg-white border-blue-100"}`}>
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
          </div>
        </div>
      </header>

      {/* CAIXA DE INFORMAÇÕES com conteúdo trocável */}
      <section className={`bg-white border rounded-2xl p-6 shadow-sm transition-colors ${darkMode ? "bg-[#0f1724]/60 border-[#223054]" : "border-[#e3edff]"}`}>
        <div className="min-h-[480px]">
          {view === "home" && <HomePlaceholder darkMode={darkMode} />}
          {view === "dashboard" && <DashboardContent darkMode={darkMode} outages={outages} />}
          {view === "administrador" && (
            <AdministradorContent
              darkMode={darkMode}
              users={users}
              setUsers={setUsers}
              admins={admins}
              setAdmins={setAdmins}
              onOpenAddUser={() => setOpenAddUser(true)}
              onOpenAddAdmin={() => setOpenAddAdmin(true)}
            />
          )}
          {view === "central" && <CentralDadosContent darkMode={darkMode} />}
          {view === "outage" && (
            <OutageContent
              darkMode={darkMode}
              outages={outages}
              onOpenAddOS={() => setOpenAddOS(true)}
            />
          )}
          {view === "settings" && <SettingsContent darkMode={darkMode} />}
        </div>
      </section>
    </motion.main>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MODAL BASE (wrapper)                           */
/* -------------------------------------------------------------------------- */
function ModalBase({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  // close on ESC, optional
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="absolute inset-0 bg-black" style={{ opacity: 0.5 }} onClick={onClose} />
      <motion.div initial={{ y: 20, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.22 }} className="relative z-10 max-w-xl w-full mx-4">
        {children}
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            ADD USER MODAL                                   */
/* -------------------------------------------------------------------------- */
function AddUserModal({ darkMode, onClose, onCreate }: { darkMode: boolean; onClose: () => void; onCreate: (u: UserItem) => void }) {
  // form state
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("Atendente");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!nome.trim()) e.nome = "Nome é obrigatório";
    if (!email.trim()) e.email = "Email é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Email inválido";
    if (!cargo.trim()) e.cargo = "Cargo é obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // fake delay
    await new Promise((r) => setTimeout(r, 700));
    onCreate({ id: Date.now(), nome: nome.trim(), email: email.trim(), cargo, status: "Ativo", ultimoLogin: "—" });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 900);
  }

  return (
    <motion.div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-[#071226] text-white" : "text-[#0f1724]"}`}>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-md">
              <UserPlus size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-semibold">Adicionar Usuário</div>
              <div className="text-xs text-blue-500">Crie uma nova conta para a equipe</div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-blue-50">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm">
            Nome
            <input value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {errors.nome && <div className="text-xs text-red-500 mt-1">{errors.nome}</div>}
          </label>

          <label className="text-sm">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
          </label>

          <label className="text-sm">
            Cargo
            <select value={cargo} onChange={(e) => setCargo(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>Atendente</option>
              <option>Técnico</option>
              <option>Financeiro</option>
              <option>Vendedor</option>
            </select>
            {errors.cargo && <div className="text-xs text-red-500 mt-1">{errors.cargo}</div>}
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border">Cancelar</button>
          <button type="submit" disabled={submitting} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2">
            {submitting ? "Criando..." : "Criar Usuário"}
            {success && <Check size={14} />}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            ADD ADMIN MODAL                                  */
/* -------------------------------------------------------------------------- */
function AddAdminModal({ darkMode, onClose, onCreate }: { darkMode: boolean; onClose: () => void; onCreate: (a: UserItem) => void }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!nome.trim()) e.nome = "Nome é obrigatório";
    if (!email.trim()) e.email = "Email é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Email inválido";
    if (!senha.trim() || senha.length < 6) e.senha = "Senha com mínimo de 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    onCreate({ id: Date.now(), nome: nome.trim(), email: email.trim(), cargo: "Administrador", status: "Ativo", ultimoLogin: "—" });
    setSubmitting(false);
    onClose();
  }

  return (
    <motion.div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-[#071226] text-white" : "text-[#0f1724]"}`}>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-md">
              <Shield size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-semibold">Cadastrar Administrador</div>
              <div className="text-xs text-blue-500">Conta com acesso total ao sistema</div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-blue-50">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm">
            Nome
            <input value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {errors.nome && <div className="text-xs text-red-500 mt-1">{errors.nome}</div>}
          </label>

          <label className="text-sm">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
          </label>

          <label className="text-sm">
            Senha
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {errors.senha && <div className="text-xs text-red-500 mt-1">{errors.senha}</div>}
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border">Cancelar</button>
          <button type="submit" disabled={submitting} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2">
            {submitting ? "Cadastrando..." : "Cadastrar Admin"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ADD OS MODAL                                   */
/* -------------------------------------------------------------------------- */
function AddOSModal({
  darkMode,
  onClose,
  onCreate,
}: {
  darkMode: boolean;
  onClose: () => void;
  onCreate: (o: OutageItem) => void;
}) {
  // multi-step: endereco -> data -> horario -> confirmar
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [endereco, setEndereco] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [impacto, setImpacto] = useState("Médio");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validateStep() {
    const e: Record<string, string> = {};

    if (step === 1 && !endereco.trim()) e.endereco = "Endereço obrigatório";
    if (step === 2 && !data.trim()) e.data = "Data obrigatória";
    if (step === 3 && !horario.trim()) e.horario = "Horário obrigatório";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleFinish() {
    if (!validateStep()) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    onCreate({
      id: Date.now(),
      area: endereco,
      endereco,
      data,
      horario,
      impacto,
      hora: horario,
      status: "Pendente",
    });

    setSubmitting(false);
    onClose();
  }

  return (
    <motion.div
      className={`rounded-2xl shadow-xl overflow-hidden ${
        darkMode ? "bg-[#071226] text-white" : "bg-white text-[#0f1724]"
      }`}
    >
      <div className="p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-md">
              <AlertTriangle size={20} className="text-orange-600" />
            </div>
            <div>
              <div className="font-semibold">Registrar Ordem de Serviço</div>
              <div className="text-xs text-blue-500">
                Preencha passo a passo e confirme
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-blue-50 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Steps UI */}
        <div className="flex items-center gap-3 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={`step-${s}`} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  step === s
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {s}
              </div>
              {s < 4 && <div className="w-8 h-[2px] bg-blue-100" />}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="min-h-[160px]">
          {step === 1 && (
            <div className="space-y-2">
              <label className="text-sm">Endereço</label>
              <input
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-300"
                placeholder="Rua, número, complemento"
              />
              {errors.endereco && (
                <div className="text-xs text-red-500">{errors.endereco}</div>
              )}

              <div className="text-xs text-blue-500/80 mt-2">
                Confirme o endereço do serviço para o técnico.
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <label className="text-sm">Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
              {errors.data && (
                <div className="text-xs text-red-500">{errors.data}</div>
              )}

              <div className="text-xs text-blue-500/80 mt-2">
                Escolha a data preferencial para o serviço.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <label className="text-sm">Horário</label>
              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
              {errors.horario && (
                <div className="text-xs text-red-500">{errors.horario}</div>
              )}

              <label className="text-sm mt-2">Impacto</label>
              <select
                value={impacto}
                onChange={(e) => setImpacto(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              >
                <option>Médio</option>
                <option>Alto</option>
                <option>Baixo</option>
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-2 text-sm">
              <div className="font-medium">Confirme os detalhes</div>

              <div>
                Endereço: <span className="font-semibold">{endereco}</span>
              </div>
              <div>
                Data: <span className="font-semibold">{data}</span>
              </div>
              <div>
                Horário: <span className="font-semibold">{horario}</span>
              </div>
              <div>
                Impacto: <span className="font-semibold">{impacto}</span>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER BUTTONS */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-blue-500">Passo {step} de 4</div>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-3 py-2 rounded-md border"
              >
                Voltar
              </button>
            )}

            {step < 4 && (
              <button
                onClick={() => {
                  if (validateStep()) setStep((s) => (s + 1) as any);
                }}
                className="px-3 py-2 rounded-md bg-blue-50"
              >
                Próximo
              </button>
            )}

            {step === 4 && (
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="animate-pulse">Registrando...</span>
                  </>
                ) : (
                  "Registrar OS"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              CONTENT: HOME                                   */
/* -------------------------------------------------------------------------- */
function HomePlaceholder({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center text-blue-500/70">
      <div className="text-xl font-medium">Bem-vindo ao MasterFrio</div>
      <p className="max-w-xl">
        Navegue pelo menu à esquerda para acessar o Dashboard, o painel de Administrador, a Central de Dados ou monitorar Outages e Ordens de Serviço.
      </p>
      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow">Ver Dashboard</button>
        <button className="px-4 py-2 rounded-lg border border-blue-100">Ver Administrador</button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             CONTENT: DASHBOARD                               */
/* -------------------------------------------------------------------------- */
function DashboardContent({ darkMode, outages }: { darkMode: boolean; outages: OutageItem[] }) {
  const cards = [
    { title: "Faturamento do Mês", value: "R$ 84.200", icon: <BarChart3 />, color: "from-blue-400 to-blue-600" },
    { title: "Ordens Concluídas", value: "128", icon: <Wrench />, color: "from-sky-300 to-blue-400" },
    { title: "Clientes Ativos", value: "234", icon: <Users />, color: "from-blue-200 to-blue-400" },
    { title: "Estoque Baixo", value: "12 itens", icon: <Package />, color: "from-blue-400 to-sky-500" },
  ];

  const orders = [
    { cliente: "Carlos Mendes", servico: "Instalação Split 9000BTU", status: "Concluído", valor: "R$ 1.200" },
    { cliente: "Loja FrioTec", servico: "Manutenção preventiva", status: "Em andamento", valor: "R$ 850" },
    { cliente: "Luciana Alves", servico: "Troca de compressor", status: "Pendente", valor: "R$ 1.400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
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
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className={`p-4 rounded-xl ${darkMode ? "bg-[#0b1220]/30" : ""}`}>
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
                {orders.map((o, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2">{o.cliente}</td>
                    <td className="py-2 text-blue-800">{o.servico}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${o.status === "Concluído" ? "bg-green-100 text-green-700" : o.status === "Em andamento" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{o.status}</span>
                    </td>
                    <td className="py-2 text-right font-semibold text-blue-700">{o.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <aside className="space-y-4">
          <div className={`p-4 rounded-xl border ${darkMode ? "border-[#223054]/40 bg-[#071226]/40" : "border-blue-100 bg-white"}`}>
            <h4 className={`text-sm font-medium ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Técnicos Online</h4>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Eduardo Lima</div>
                    <div className="text-xs text-blue-500">Instalação</div>
                  </div>
                </div>
                <div className="text-xs text-green-600 font-semibold">Em campo</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-300 to-sky-500" />
                  <div>
                    <div className="text-sm font-medium">Rafael Gomes</div>
                    <div className="text-xs text-blue-500">Manutenção</div>
                  </div>
                </div>
                <div className="text-xs text-green-600 font-semibold">Disponível</div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? "border-[#223054]/40 bg-[#071226]/40" : "border-blue-100 bg-white"}`}>
            <h4 className={`text-sm font-medium ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Sincronização</h4>
            <div className="mt-3 text-sm text-blue-500 flex items-center gap-2">
              <ArrowUpRight size={16} />
              Última sincronização há 2 minutos
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           CONTENT: ADMINISTRADOR                             */
/* -------------------------------------------------------------------------- */
function AdministradorContent({
  darkMode,
  users,
  setUsers,
  admins,
  setAdmins,
  onOpenAddUser,
  onOpenAddAdmin,
}: {
  darkMode: boolean;
  users: UserItem[];
  setUsers: (u: UserItem[]) => void;
  admins: UserItem[];
  setAdmins: (a: UserItem[]) => void;
  onOpenAddUser: () => void;
  onOpenAddAdmin: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<UserItem[]>(users);

  useEffect(() => {
    setFiltered(users.filter((u) => u.nome.toLowerCase().includes(search.toLowerCase())));
  }, [users, search]);

  function handleDelete(id: number) {
    if (!confirm("Remover usuário?")) return;
    setUsers(users.filter((u) => u.id !== id));
    setAdmins(admins.filter((a) => a.id !== id));
  }

  return (
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
            <Search size={16} className="absolute left-3 top-2.5 text-blue-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar usuário..." className="pl-10 pr-3 py-2 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-300 focus:outline-none text-sm" />
          </div>

          <button onClick={onOpenAddUser} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow">
            <UserPlus size={16} />
            Adicionar
          </button>

          <button onClick={onOpenAddAdmin} className="flex items-center gap-2 border px-4 py-2 rounded-xl">
            <Plus size={16} />
            Cadastrar Admin
          </button>
        </div>
      </div>

      <div className={`rounded-xl border ${darkMode ? "border-[#223054]/40 bg-[#061025]/30" : "border-blue-100 bg-white"} p-4`}>
        <table className="w-full text-sm">
          <thead className="text-blue-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="pb-2 text-left">Nome</th>
              <th className="pb-2 text-left">Cargo</th>
              <th className="pb-2 text-left">Status</th>
              <th className="pb-2 text-left">Último Login</th>
              <th className="pb-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {filtered.map((u, i) => (
              <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                <td className="py-2 font-medium">{u.nome}</td>
                <td className="py-2">{u.cargo}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${u.status === "Ativo" ? "bg-green-100 text-green-700" : u.status === "Em campo" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{u.status}</span>
                </td>
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

      <div className="flex justify-between items-center text-sm text-blue-500">
        <div>Total de usuários: {filtered.length}</div>
        <div>Admins: {admins.length}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          CONTENT: CENTRAL DE DADOS                           */
/* -------------------------------------------------------------------------- */
function CentralDadosContent({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Database size={18} className="text-blue-600" />
        <div>
          <div className={`text-sm font-semibold ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Central de Dados</div>
          <div className="text-xs text-blue-500">APIs, integrações e backups</div>
        </div>
      </div>

      <div className={`rounded-xl border p-4 ${darkMode ? "border-[#223054]/40 bg-[#071226]/20" : "border-blue-100 bg-white"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-md border border-dashed text-sm">Conector ERP: conectado</div>
          <div className="p-3 rounded-md border border-dashed text-sm">Último backup: 10/11/2025 02:05</div>
          <div className="p-3 rounded-md border border-dashed text-sm">Fila de sincronização: 3 itens</div>
        </div>
      </div>

      <div className="rounded-xl border p-4 text-sm">
        Logs recentes:
        <ul className="mt-2 list-disc list-inside text-xs text-blue-600/80">
          <li>10/11/2025 14:12 - Importação de clientes finalizada</li>
          <li>10/11/2025 12:40 - Integração com distribuidor concluída</li>
          <li>09/11/2025 22:01 - Backup agendado executado</li>
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             CONTENT: OUTAGE & OS                             */
/* -------------------------------------------------------------------------- */
function OutageContent({ darkMode, outages, onOpenAddOS }: { darkMode: boolean; outages: OutageItem[]; onOpenAddOS: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} className="text-orange-600" />
          <div>
            <div className={`text-sm font-semibold ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Outage & Ordens</div>
            <div className="text-xs text-blue-500">Incidentes, ordens e atendimento</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onOpenAddOS} className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-xl shadow">
            <Plus size={16} />
            Criar OS
          </button>
        </div>
      </div>

      <div className={`rounded-xl border p-4 ${darkMode ? "border-[#223054]/40 bg-[#071226]/20" : "border-blue-100 bg-white"}`}>
        <table className="w-full text-sm">
          <thead className="text-blue-500 uppercase text-xs">
            <tr>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Área</th>
              <th className="text-left py-2">Impacto</th>
              <th className="text-left py-2">Status</th>
              <th className="text-right py-2">Hora</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {outages.map((o) => (
              <tr key={o.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="py-2">{o.id}</td>
                <td className="py-2">{o.endereco ?? o.area}</td>
                <td className="py-2">{o.impacto}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${o.status === "Resolvido" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{o.status}</span>
                </td>
                <td className="py-2 text-right">{o.horario ?? o.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             CONTENT: SETTINGS                                */
/* -------------------------------------------------------------------------- */
function SettingsContent({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sliders size={18} className="text-blue-600" />
        <div>
          <div className={`text-sm font-semibold ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Configurações do Sistema</div>
          <div className="text-xs text-blue-500">Preferências, tema, e integrações</div>
        </div>
      </div>

      <div className={`rounded-xl border p-4 ${darkMode ? "border-[#223054]/40 bg-[#071226]/20" : "border-blue-100 bg-white"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium">Preferências</div>
            <div className="text-xs text-blue-500">Ajustes gerais do sistema, idioma e formato de data.</div>
          </div>
          <div>
            <div className="text-sm font-medium">Integrações</div>
            <div className="text-xs text-blue-500">Conectar ERP a fornecedores e plataformas.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
