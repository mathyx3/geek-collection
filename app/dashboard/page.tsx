"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      setUserEmail(session.user.email ?? null)
      setLoading(false)
    }

    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-purple-400">
        Carregando dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/60 border-r border-purple-800 p-6">
        <h1 className="text-2xl font-bold text-purple-400 mb-8">
          Geek Collection
        </h1>

        <nav className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/perfil")}
            className="text-left px-4 py-2 rounded-lg hover:bg-purple-900 transition"
          >
            👤 Perfil
          </button>

          {/* Futuro */}
          <button
            disabled
            className="text-left px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
          >
            🎯 Missões
          </button>

          <button
            disabled
            className="text-left px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
          >
            🖼️ Coleção
          </button>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-purple-300">
              Dashboard
            </h2>
            <p className="text-sm text-zinc-400">
              Logado como {userEmail}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition"
          >
            Sair
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/50 border border-purple-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300">
              Colecionáveis
            </h3>
            <p className="text-zinc-400 mt-2">
              Em breve você poderá visualizar seus itens digitais aqui.
            </p>
          </div>

          <div className="bg-black/50 border border-purple-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300">
              Missões
            </h3>
            <p className="text-zinc-400 mt-2">
              Complete missões para ganhar pontos e recompensas.
            </p>
          </div>

          <div className="bg-black/50 border border-purple-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300">
              Perfil
            </h3>
            <p className="text-zinc-400 mt-2">
              Personalize seu perfil geek.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
