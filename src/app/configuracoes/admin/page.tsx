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
  Bell,
  Globe,
  Lock,
  Palette,
  Mail,
  Key,
  Building,
  Upload,
  Check,
  X,
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

export default function Configuracoes() {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');

  // Estados de configurações (mock)
  const [userName, setUserName] = useState('Pedro G.');
  const [userEmail, setUserEmail] = useState('pedro@masterfrio.com');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('pt-BR');
  const [twoFactor, setTwoFactor] = useState(false);
  const [companyName, setCompanyName] = useState('Masterfrio');
  const [apiKey, setApiKey] = useState('');

  const openModal = (section: string) => {
    setSelectedSection(section);
    setModalOpen(true);
  };

  const saveChanges = () => {
    // Lógica de salvamento (mock)
    alert('Configurações salvas com sucesso!');
    setModalOpen(false);
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
                const active = m.key === 'settings';
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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Personalize sua conta, preferências e configurações do sistema
              </p>
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

          {/* SEÇÕES DE CONFIGURAÇÕES */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <Settings size={24} className="text-primary" />
              Configurações Gerais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Perfil */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-border bg-muted/30 shadow-inner hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Perfil do Usuário</h3>
                  </div>
                  <button
                    onClick={() => openModal('perfil')}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Editar
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">Nome: {userName}</p>
                <p className="text-sm text-muted-foreground mt-1">Email: {userEmail}</p>
              </motion.div>

              {/* Card Preferências */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-border bg-muted/30 shadow-inner hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Palette size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Preferências</h3>
                  </div>
                  <button
                    onClick={() => openModal('preferencias')}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Editar
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">Tema: {darkMode ? 'Escuro' : 'Claro'}</p>
                <p className="text-sm text-muted-foreground mt-1">Idioma: {language === 'pt-BR' ? 'Português (BR)' : 'English'}</p>
              </motion.div>

              {/* Card Notificações */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-border bg-muted/30 shadow-inner hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Notificações</h3>
                  </div>
                  <button
                    onClick={() => openModal('notificacoes')}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Editar
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">Email: {notifications ? 'Ativadas' : 'Desativadas'}</p>
                <p className="text-sm text-muted-foreground mt-1">Push: {notifications ? 'Ativadas' : 'Desativadas'}</p>
              </motion.div>

              {/* Card Segurança */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-border bg-muted/30 shadow-inner hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Lock size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Segurança</h3>
                  </div>
                  <button
                    onClick={() => openModal('seguranca')}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Editar
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">2FA: {twoFactor ? 'Ativado' : 'Desativado'}</p>
                <p className="text-sm text-muted-foreground mt-1">Sessões ativas: 2</p>
              </motion.div>

              {/* Card Integrações */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-border bg-muted/30 shadow-inner hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Integrações</h3>
                  </div>
                  <button
                    onClick={() => openModal('integracoes')}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Editar
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">ERP: Conectado</p>
                <p className="text-sm text-muted-foreground mt-1">API Key: ****-****-****</p>
              </motion.div>

              {/* Card Empresa */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-border bg-muted/30 shadow-inner hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Building size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Configurações da Empresa</h3>
                  </div>
                  <button
                    onClick={() => openModal('empresa')}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Editar
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">Nome: {companyName}</p>
                <p className="text-sm text-muted-foreground mt-1">Logo: Personalizado</p>
              </motion.div>
            </div>
          </section>
        </main>
      </div>

      {/* MODAL DE EDIÇÃO */}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Editar {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                {selectedSection === 'perfil' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome completo</label>
                      <input
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </>
                )}

                {selectedSection === 'preferencias' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Palette size={20} className="text-primary" />
                        <span className="font-medium">Tema escuro</span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={() => setDarkMode(d => !d)}
                          className="sr-only"
                          id="dark-toggle"
                        />
                        <label
                          htmlFor="dark-toggle"
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            darkMode ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transform transition-transform ${darkMode ? 'translate-x-6' : ''}`} />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Idioma</label>
                      <select
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedSection === 'notificacoes' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail size={20} className="text-primary" />
                        <span className="font-medium">Notificações por email</span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={notifications}
                          onChange={() => setNotifications(n => !n)}
                          className="sr-only"
                          id="notif-toggle"
                        />
                        <label
                          htmlFor="notif-toggle"
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            notifications ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transform transition-transform ${notifications ? 'translate-x-6' : ''}`} />
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <Bell size={20} className="text-primary" />
                        <span className="font-medium">Notificações push</span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={notifications}
                          onChange={() => setNotifications(n => !n)}
                          className="sr-only"
                          id="push-toggle"
                        />
                        <label
                          htmlFor="push-toggle"
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            notifications ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transform transition-transform ${notifications ? 'translate-x-6' : ''}`} />
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {selectedSection === 'seguranca' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key size={20} className="text-primary" />
                        <span className="font-medium">Autenticação de 2 fatores (2FA)</span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={twoFactor}
                          onChange={() => setTwoFactor(t => !t)}
                          className="sr-only"
                          id="2fa-toggle"
                        />
                        <label
                          htmlFor="2fa-toggle"
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            twoFactor ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transform transition-transform ${twoFactor ? 'translate-x-6' : ''}`} />
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Nova senha</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="••••••••"
                      />
                    </div>
                  </>
                )}

                {selectedSection === 'integracoes' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Chave API ERP</label>
                      <input
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Insira sua chave API"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-medium">Status da integração</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                        <Check size={16} />
                        Conectado
                      </span>
                    </div>
                  </>
                )}

                {selectedSection === 'empresa' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome da empresa</label>
                      <input
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Logo da empresa</label>
                      <div className="flex items-center gap-4">
                        <Image src={"/Images/MasterFrio_Logo.png"} alt="Logo" width={120} height={40} className="h-10 w-auto rounded" />
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                          <Upload size={16} />
                          Alterar logo
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveChanges}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
                >
                  <Check size={18} />
                  Salvar Alterações
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}