'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Plus, Trash2, X } from 'lucide-react'

type User = {
  id: string
  nome: string
  email: string
  perfil: string
  status: 'Ativo' | 'Inativo'
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([
    { id: '01', nome: 'Fulano Silva', email: 'fulano@gmail.com', perfil: 'Admin', status: 'Ativo' },
    { id: '02', nome: 'Ciclano Santos', email: 'ciclano@gmail.com', perfil: 'Gerente', status: 'Ativo' },
    { id: '03', nome: 'Beltrano Souza', email: 'beltrano@gmail.com', perfil: 'Técnico', status: 'Inativo' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    perfil: '',
    status: 'Ativo' as 'Ativo' | 'Inativo',
  })

  const handleAddUser = () => {
    setEditingUser(null)
    setFormData({ nome: '', email: '', perfil: '', status: 'Ativo' })
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      status: user.status,
    })
    setIsDialogOpen(true)
  }

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...formData } : u))
    } else {
      const newUser: User = {
        id: String(users.length + 1).padStart(2, '0'),
        ...formData,
      }
      setUsers([...users, newUser])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    //  Usando gradientes suaves como no dashboard original
    <div className="flex min-h-screen bg-gradient-to-br from-white via-[#f3f8ff] to-[#e4efff] dark:from-[#0e1628] dark:via-[#121b31] dark:to-[#1c2741]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <Header 
          title="Configurações - Usuários" 
          subtitle="Gerencie os usuários do sistema"
        />

        <div className="flex-1 p-8">
          {/*  Card com fundo suave e bordas sutis */}
          <div className="bg-gradient-to-br from-white to-[#f0f6ff] dark:from-[#19233b]/60 dark:to-[#19233b]/40 border border-[#e2ecff] dark:border-[#2a3658] rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.06)]">
            {/*  Tabs com cores mais suaves */}
            <div className="flex border-b border-[#e2ecff] dark:border-[#2a3658]">
              <Link href="/configuracoes/usuarios" className="px-6 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-700 dark:text-blue-300">
                Usuários
              </Link>
              <Link href="/configuracoes/servicos" className="px-6 py-3 text-sm font-medium text-[#7b8cbf] dark:text-blue-300/70 hover:text-blue-700 dark:hover:text-blue-200">
                Serviços
              </Link>
              <Link href="/configuracoes/contratos" className="px-6 py-3 text-sm font-medium text-[#7b8cbf] dark:text-blue-300/70 hover:text-blue-700 dark:hover:text-blue-200">
                Contratos
              </Link>
            </div>

            {/*  Botões com cores mais profissionais */}
            <div className="p-6 border-b border-[#e2ecff] dark:border-[#2a3658] flex gap-3">
              <button onClick={handleAddUser} className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex items-center gap-2 font-medium text-sm">
                <Plus size={16} />
                Novo Usuário
              </button>
              <button className="px-4 py-2 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium text-sm">
                Deletar
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {/*  Header da tabela com fundo azul suave */}
                  <tr className="border-b border-[#e2ecff] dark:border-[#2a3658] bg-blue-50/40 dark:bg-[#1b2540]/40">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      Perfil
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2ecff] dark:divide-[#2a3658]">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/30 dark:hover:bg-[#1b2540]/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#1a2740] dark:text-blue-100">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1a2740] dark:text-blue-100">
                        {user.nome}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#7b8cbf] dark:text-blue-300/70">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1a2740] dark:text-blue-100">
                        {user.perfil}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Ativo'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
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
            <div className="p-6 border-t border-[#e2ecff] dark:border-[#2a3658] flex justify-end gap-3">
              <button className="px-4 py-2 border border-[#e2ecff] dark:border-[#2a3658] text-[#1a2740] dark:text-blue-100 rounded-xl hover:bg-blue-50 dark:hover:bg-[#243459] transition-colors font-medium text-sm">
                Restaurar
              </button>
              <button className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm font-medium text-sm">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </main>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setIsDialogOpen(false)}>
          {/*  Modal com estilo mais suave */}
          <div className="bg-gradient-to-br from-white to-[#f0f6ff] dark:from-[#1b2540] dark:to-[#19233b] border border-[#e2ecff] dark:border-[#2a3658] rounded-2xl shadow-2xl w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-[#e2ecff] dark:border-[#2a3658]">
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-200">
                {editingUser ? 'Editar Usuário' : 'Cadastrar Usuário'}
              </h2>
              <button onClick={() => setIsDialogOpen(false)} className="text-[#7b8cbf] dark:text-blue-300/70 hover:text-blue-700 dark:hover:text-blue-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="nome" className="text-sm font-medium text-blue-700 dark:text-blue-200">Nome</label>
                <input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Digite o nome"
                  className="w-full px-3 py-2 bg-white dark:bg-[#0f1724] border border-[#e2ecff] dark:border-[#2a3658] rounded-xl text-[#1a2740] dark:text-blue-100 placeholder:text-[#7b8cbf] dark:placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-blue-700 dark:text-blue-200">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Digite o email"
                  className="w-full px-3 py-2 bg-white dark:bg-[#0f1724] border border-[#e2ecff] dark:border-[#2a3658] rounded-xl text-[#1a2740] dark:text-blue-100 placeholder:text-[#7b8cbf] dark:placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="perfil" className="text-sm font-medium text-blue-700 dark:text-blue-200">Perfil</label>
                <select
                  id="perfil"
                  value={formData.perfil}
                  onChange={(e) => setFormData({ ...formData, perfil: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-[#0f1724] border border-[#e2ecff] dark:border-[#2a3658] rounded-xl text-[#1a2740] dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione o perfil</option>
                  <option value="Admin">Admin</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Técnico">Técnico</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-blue-700 dark:text-blue-200">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Ativo' | 'Inativo' })}
                  className="w-full px-3 py-2 bg-white dark:bg-[#0f1724] border border-[#e2ecff] dark:border-[#2a3658] rounded-xl text-[#1a2740] dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="pt-2">
                <button className="w-full px-4 py-2 border border-[#e2ecff] dark:border-[#2a3658] text-[#1a2740] dark:text-blue-100 rounded-xl hover:bg-blue-50 dark:hover:bg-[#243459] transition-colors font-medium text-sm">
                  Redefinir senha
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-[#e2ecff] dark:border-[#2a3658] flex justify-end gap-3">
              <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border border-[#e2ecff] dark:border-[#2a3658] text-[#1a2740] dark:text-blue-100 rounded-xl hover:bg-blue-50 dark:hover:bg-[#243459] transition-colors font-medium text-sm">
                Cancelar
              </button>
              <button onClick={handleSaveUser} className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm font-medium text-sm">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
