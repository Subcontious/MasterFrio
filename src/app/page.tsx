'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogIn, Sun, Moon, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mf:dark');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved !== null ? JSON.parse(saved) : prefersDark;
    setDarkMode(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('mf:dark', JSON.stringify(darkMode));
  }, [darkMode]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'admin' && senha === 'admin') {
      router.push('/dashboard');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4 antialiased bg-background transition-colors duration-500"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/Images/MasterFrio_Logo.png"
            alt="MasterFrio"
            width={220}
            height={60}
            priority
            className="h-14 w-auto"
          />
        </div>

        {/* Card de Login */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h1>
              <p className="text-sm text-muted-foreground mt-1">Acesse sua conta MasterFrio</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Alternar tema"
            >
              {darkMode ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Login</label>
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                placeholder="Digite seu login"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Senha</label>
              <input
                type="password"
                required
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-xl">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
              {!loading && <LogIn size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <AlertCircle size={16} className="text-primary" />
            Dica: Use login: <strong>admin</strong> e senha: <strong>admin</strong>
          </div>

          <div className="mt-4 text-center text-sm">
            <a href="#" className="text-primary hover:underline font-medium">Esqueceu a senha? Recuperar</a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          © 2025 Masterfrio – Todos os direitos reservados
        </div>
      </motion.div>
    </motion.div>
  );
}