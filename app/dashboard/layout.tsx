"use client"

import Link from "next/link"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-purple-800">
        <h1 className="text-2xl font-bold text-purple-400 mb-8">
          Geek Collection
        </h1>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard/perfil" className="hover:text-purple-400">
            👤 Perfil
          </Link>
          <Link href="/dashboard/missoes" className="hover:text-purple-400">
            🎯 Missões
          </Link>
          <Link href="/dashboard/colecao" className="hover:text-purple-400">
            🧩 Coleção
          </Link>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
