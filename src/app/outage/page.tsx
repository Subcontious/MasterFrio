'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User, Settings, LogOut, ChevronDown, Sun, Moon, AlertTriangle, Plus, X
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
export default function OutageOs() {
  const [darkMode, setDarkMode] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const [outages, setOutages] = useState([
    { id: 1, area: "Loja Centro", impacto: "Alto", status: "Em andamento", hora: "11:10", endereco: "Av. Principal, 123", data: "2025-11-13", horario: "11:00" },
  ]);

  const [openAddOS, setOpenAddOS] = useState(false);

  const [step, setStep] = useState(1);
  const [endereco, setEndereco] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [impacto, setImpacto] = useState("Médio");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                    m.key === "outage"
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
          <header></header>

          <section className={`bg-white border rounded-2xl p-6 shadow-sm ${darkMode ? "bg-[#0f1724]/60 border-[#223054]" : "border-[#e3edff]"}`}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-orange-600" />
                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? "text-blue-100" : "text-blue-700"}`}>Outage & Ordens</div>
                    <div className="text-xs text-blue-500">Incidentes, ordens e atendimento</div>
                  </div>
                </div>
                <button onClick={() => { setOpenAddOS(true); setStep(1); }} className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-xl">
                  <Plus size={16} /> Criar OS
                </button>
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
                    {outages.map(o => (
                      <tr key={o.id}>
                        <td className="py-2">{o.id}</td>
                        <td className="py-2">{o.endereco ?? o.area}</td>
                        <td className="py-2">{o.impacto}</td>
                        <td className="py-2"><span className={`px-2 py-1 rounded-md text-xs ${o.status === "Em andamento" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{o.status}</span></td>
                        <td className="py-2 text-right">{o.horario ?? o.hora}</td>
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
        {openAddOS && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpenAddOS(false)} />
            <div className={`relative rounded-2xl shadow-xl w-full max-w-lg p-6 ${darkMode ? "bg-[#071226] text-white" : "bg-white"}`}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded"><AlertTriangle size={20} className="text-orange-600" /></div>
                  <div>Registrar Ordem de Serviço</div>
                </div>
                <button onClick={() => setOpenAddOS(false)}><X size={18} /></button>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                {[1,2,3,4].map(s => (
                  <div key={s} className={`w-9 h-9 rounded-full flex items-center justify-center ${step >= s ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>
                    {s}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <label className="block text-sm mb-1">Endereço</label>
                  <input value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full rounded-md border px-3 py-2" placeholder="Rua, número..." />
                </div>
              )}
              {step === 2 && (
                <div>
                  <label className="block text-sm mb-1">Data</label>
                  <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full rounded-md border px-3 py-2" />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Horário</label>
                    <input type="time" value={horario} onChange={e => setHorario(e.target.value)} className="w-full rounded-md border px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Impacto</label>
                    <select value={impacto} onChange={e => setImpacto(e.target.value)} className="w-full rounded-md border px-3 py-2">
                      <option>Médio</option><option>Alto</option><option>Baixo</option>
                    </select>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="text-sm space-y-2">
                  <div className="font-medium">Confirme:</div>
                  <div>Endereço: <strong>{endereco}</strong></div>
                  <div>Data: <strong>{data}</strong></div>
                  <div>Horário: <strong>{horario}</strong></div>
                  <div>Impacto: <strong>{impacto}</strong></div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <div className="text-xs text-blue-500">Passo {step} de 4</div>
                <div className="flex gap-2">
                  {step > 1 && <button onClick={() => setStep(step - 1)} className="px-4 py-2 border rounded-md">Voltar</button>}
                  {step < 4 && <button onClick={() => setStep(step + 1)} className="px-4 py-2 bg-blue-50 rounded-md">Próximo</button>}
                  {step === 4 && (
                    <button onClick={() => {
                      setOutages(prev => [{ id: Date.now(), area: endereco, endereco, data, horario, impacto, hora: horario, status: "Pendente" }, ...prev]);
                      setOpenAddOS(false);
                      setEndereco(""); setData(""); setHorario(""); setImpacto("Médio");
                    }} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl">
                      Registrar OS
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}