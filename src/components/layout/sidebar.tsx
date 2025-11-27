'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Briefcase, FileText, Settings, Package, BarChart3 } from 'lucide-react'

const menuItems = [
  { key: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { key: 'users', name: 'Usuários', icon: Users, path: '/config/usuarios' },
  { key: 'services', name: 'Serviços', icon: Briefcase, path: '/config/servicos' },
  { key: 'contracts', name: 'Contratos', icon: FileText, path: '/config/contratos' },
  { key: 'stock', name: 'Estoque', icon: Package, path: '/estoque' },
  { key: 'reports', name: 'Relatórios', icon: BarChart3, path: '/relatorios' },
  { key: 'settings', name: 'Configurações', icon: Settings, path: '/configuracoes' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">MasterFrio</h1>
            <p className="text-xs text-muted-foreground">Sistema de Climatização</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          const Icon = item.icon
          
          return (
            <Link
              key={item.key}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-center text-muted-foreground">
          © 2025 MasterFrio
        </div>
      </div>
    </aside>
  )
}
