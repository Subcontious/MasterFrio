'use client'

import { useState } from 'react'
import { Sun, Moon, User, Settings, LogOut, ChevronDown } from 'lucide-react'

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const [darkMode, setDarkMode] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="border-b border-border bg-card px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">Fulano</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
              <ChevronDown
                size={16}
                className={`text-muted-foreground transition-transform ${
                  userMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg overflow-hidden z-50">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent text-foreground text-sm transition-colors">
                  <User size={16} />
                  <span>Perfil</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent text-foreground text-sm transition-colors">
                  <Settings size={16} />
                  <span>Configurações</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 text-destructive text-sm transition-colors border-t border-border">
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
