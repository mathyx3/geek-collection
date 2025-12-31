"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">
      {/* MENU LATERAL */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#12001c] border-r border-purple-800 p-6 z-40
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-2xl font-bold text-purple-400 mb-8">
          Geek Collection
        </h2>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="hover:text-purple-400">
            🏠 Dashboard
          </Link>

          <Link href="/missions" className="hover:text-purple-400">
            🎯 Missões
          </Link>

          <Link href="/profile" className="hover:text-purple-400">
            👤 Perfil
          </Link>

          <Link href="/collection" className="hover:text-purple-400">
            🧩 Coleção
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 ml-0">
        {/* HEADER */}
        <header className="flex items-center gap-4 p-4 border-b border-purple-800">
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl text-purple-400"
          >
            ☰
          </button>

          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
