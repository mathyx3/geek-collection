"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-purple-700">
        <button
          onClick={() => setOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>

        <h1 className="text-lg font-bold text-purple-400">
          Geek Collection
        </h1>

        <button
          onClick={handleLogout}
          className="bg-purple-600 px-3 py-1 rounded-md"
        >
          Sair
        </button>
      </header>

      {/* Sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-black border-r border-purple-700 p-5
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-6 text-purple-400">
          Menu
        </h2>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard/profile" onClick={() => setOpen(false)}>
            👤 Perfil
          </Link>
          <Link href="/dashboard/missions" onClick={() => setOpen(false)}>
            🎯 Missões
          </Link>
          <Link href="/dashboard/collection" onClick={() => setOpen(false)}>
            🧩 Coleção
          </Link>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="p-6">{children}</main>
    </div>
  )
}
