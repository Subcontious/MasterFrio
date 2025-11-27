'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Plus, Trash2, X } from 'lucide-react'

type Service = {
  id: string
  nome: string
  duracao: string
  custo: string
}

export default function ServicosPage() {
  const [services, setServices] = useState<Service[]>([
    { id: '01', nome: 'Instalação Split 9000BTU', duracao: '50min', custo: 'R$80' },
    { id: '02', nome: 'Manutenção Preventiva', duracao: '50min', custo: 'R$80' },
    { id: '03', nome: 'Troca de Compressor', duracao: '50min', custo: 'R$80' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    duracao: '',
    custo: '',
    material: false,
    alcas: false,
  })

  const handleAddService = () => {
    setEditingService(null)
    setFormData({ nome: '', descricao: '', duracao: '', custo: '', material: false, alcas: false })
    setIsDialogOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setFormData({
      nome: service.nome,
      descricao: '',
      duracao: service.duracao,
      custo: service.custo,
      material: false,
      alcas: false,
    })
    setIsDialogOpen(true)
  }

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...editingService, nome: formData.nome, duracao: formData.duracao, custo: formData.custo } : s))
    } else {
      const newService: Service = {
        id: String(services.length + 1).padStart(2, '0'),
        nome: formData.nome,
        duracao: formData.duracao,
        custo: formData.custo,
      }
      setServices([...services, newService])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <Header 
          title="Configurações - Serviços" 
          subtitle="Gerencie os serviços oferecidos"
        />

        <div className="flex-1 p-8">
          <div className="bg-card border border-border rounded-xl shadow-sm">
            <div className="flex border-b border-border">
              <Link href="/configuracoes/usuarios" className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                Usuários
              </Link>
              <Link href="/configuracoes/servicos" className="px-6 py-3 text-sm font-medium border-b-2 border-primary text-primary">
                Serviços
              </Link>
              <Link href="/configuracoes/contratos" className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                Contratos
              </Link>
            </div>

            <div className="p-6 border-b border-border flex gap-3">
              <button onClick={handleAddService} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium text-sm">
                <Plus size={16} />
                Novo Serviço
              </button>
              <button className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors font-medium text-sm">
                Deletar
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Nome do Serviço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Duração Padrão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Custo Estimado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {service.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary font-medium">
                        {service.nome}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {service.duracao}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {service.custo}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditService(service)}
                            className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsDialogOpen(false)}>
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">
                {editingService ? 'Editar Serviço' : 'Cadastrar Serviço'}
              </h2>
              <button onClick={() => setIsDialogOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="nome" className="text-sm font-medium text-foreground">Nome</label>
                <input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Digite o nome do serviço"
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="descricao" className="text-sm font-medium text-foreground">Descrição</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o serviço"
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="duracao" className="text-sm font-medium text-foreground">Duração padrão</label>
                  <input
                    id="duracao"
                    type="text"
                    value={formData.duracao}
                    onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                    placeholder="Ex: 50min"
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="custo" className="text-sm font-medium text-foreground">Custo estimado</label>
                  <input
                    id="custo"
                    type="text"
                    value={formData.custo}
                    onChange={(e) => setFormData({ ...formData, custo: e.target.value })}
                    placeholder="Ex: R$80"
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="material"
                    checked={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.checked })}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                  />
                  <label htmlFor="material" className="text-sm text-foreground cursor-pointer">
                    Material
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="alcas"
                    checked={formData.alcas}
                    onChange={(e) => setFormData({ ...formData, alcas: e.target.checked })}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                  />
                  <label htmlFor="alcas" className="text-sm text-foreground cursor-pointer">
                    Alças padrão
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors font-medium text-sm">
                Cancelar
              </button>
              <button onClick={handleSaveService} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
