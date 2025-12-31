"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* MENU LATERAL */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 p-6 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-6 text-purple-400">
          Geek Collection
        </h2>

        <nav className="flex flex-col gap-4">
          <button
            onClick={() => {
              router.push("/dashboard")
              setMenuOpen(false)
            }}
            className="text-left hover:text-purple-400"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              router.push("/missions")
              setMenuOpen(false)
            }}
            className="text-left hover:text-purple-400"
          >
            Missões
          </button>

          <button
            onClick={() => {
              router.push("/profile")
              setMenuOpen(false)
            }}
            className="text-left hover:text-purple-400"
          >
            Perfil
          </button>
        </nav>
      </div>

      {/* CONTEÚDO */}
      <div className="flex-1 p-6">
        {/* BOTÃO ☰ */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl mb-6"
        >
          ☰
        </button>

        <h1 className="text-3xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="text-zinc-400">
          Bem-vindo ao Geek Collection 🚀  
          Escolha uma opção no menu.
        </p>
      </div>
    </div>
  )
}
