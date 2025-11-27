'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

export default function ContratosPage() {
  const [periodicidade, setPeriodicidade] = useState('mensal')
  const [tipoManutencao, setTipoManutencao] = useState('preventiva')
  const [alertaRenovacao, setAlertaRenovacao] = useState('30')
  const [template, setTemplate] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  )

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <Header 
          title="Configurações - Contratos" 
          subtitle="Configure os templates de contratos"
        />

        <div className="flex-1 p-8">
          <div className="bg-card border border-border rounded-xl shadow-sm">
            <div className="flex border-b border-border">
              <Link href="/configuracoes/usuarios" className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                Usuários
              </Link>
              <Link href="/configuracoes/servicos" className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                Serviços
              </Link>
              <Link href="/configuracoes/contratos" className="px-6 py-3 text-sm font-medium border-b-2 border-primary text-primary">
                Contratos
              </Link>
            </div>

            <div className="p-6 space-y-6">
              {/* Configuration Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">
                    Periodicidade Padrão
                  </label>
                  <select
                    value={periodicidade}
                    onChange={(e) => setPeriodicidade(e.target.value)}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-medium"
                  >
                    <option value="mensal">Mensal</option>
                    <option value="trimestral">Trimestral</option>
                    <option value="semestral">Semestral</option>
                    <option value="anual">Anual</option>
                  </select>
                  <div className="pt-2 space-y-1">
                    <div className="text-xs text-muted-foreground">Mensal</div>
                    <div className="text-xs text-muted-foreground">Trimestral</div>
                    <div className="text-xs text-muted-foreground">Semestral</div>
                    <div className="text-xs text-muted-foreground">Anual</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">
                    Tipo de Manutenção
                  </label>
                  <select
                    value={tipoManutencao}
                    onChange={(e) => setTipoManutencao(e.target.value)}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-medium"
                  >
                    <option value="preventiva">Preventiva</option>
                    <option value="corretiva">Corretiva</option>
                    <option value="preditiva">Preditiva</option>
                  </select>
                  <div className="pt-2 space-y-1">
                    <div className="text-xs text-muted-foreground">Preventiva</div>
                    <div className="text-xs text-muted-foreground">Corretiva</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">
                    Alerta de Renovação
                  </label>
                  <select
                    value={alertaRenovacao}
                    onChange={(e) => setAlertaRenovacao(e.target.value)}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-medium"
                  >
                    <option value="15">15 dias</option>
                    <option value="30">30 dias</option>
                    <option value="60">60 dias</option>
                    <option value="90">90 dias</option>
                  </select>
                  <div className="pt-2 space-y-1">
                    <div className="text-xs text-muted-foreground">15 dias</div>
                  </div>
                </div>
              </div>

              {/* Template Section */}
              <div className="space-y-3 pt-6">
                <label className="text-base font-semibold text-foreground block">
                  Template de Contrato:
                </label>
                <textarea
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full min-h-[300px] px-4 py-3 bg-background border border-input rounded-lg text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  placeholder="Digite o template do contrato..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors font-medium text-sm">
                Restaurar
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
