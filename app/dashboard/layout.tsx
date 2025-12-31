"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">
      
      {/* MENU LATERAL */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-[#111118] border-r border-purple-700
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 text-xl font-bold text-purple-400">
          Geek Collection
        </div>

        <nav className="flex flex-col gap-4 px-6">
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link href="/missions" onClick={() => setOpen(false)}>
            Missões
          </Link>

          <Link href="/profile" onClick={() => setOpen(false)}>
            Perfil
          </Link>

          <Link href="/collection" onClick={() => setOpen(false)}>
            Coleção
          </Link>
        </nav>
      </div>

      {/* CONTEÚDO */}
      <div className="flex-1 w-full">
        {/* HEADER */}
        <header className="flex items-center gap-4 p-4 border-b border-purple-800 bg-[#0f0f16]">
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl"
          >
            ☰
          </button>

          <h1 className="text-lg font-semibold text-purple-300">
            Dashboard
          </h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
