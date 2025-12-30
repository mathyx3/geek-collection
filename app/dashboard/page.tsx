"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.replace("/login")
        return
      }

      setEmail(data.user.email ?? null)
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-purple-700">
        <h1 className="text-2xl font-bold text-purple-400 mb-8">
          Geek Collection
        </h1>

        <nav className="space-y-4">
          <button
            onClick={() => router.push("/profile")}
            className="block w-full text-left hover:text-purple-400"
          >
            👤 Perfil
          </button>

          <button
            onClick={() => router.push("/missions")}
            className="block w-full text-left hover:text-purple-400"
          >
            🎯 Missões
          </button>

          <button
            onClick={() => router.push("/collection")}
            className="block w-full text-left hover:text-purple-400"
          >
            🧩 Coleção
          </button>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-sm text-gray-300">Logado como {email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Sair
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-purple-600 rounded-lg p-4 bg-black/30">
            <h3 className="text-lg font-semibold text-purple-400">
              Colecionáveis
            </h3>
            <p className="text-sm text-gray-300">
              Em breve você verá seus itens digitais aqui.
            </p>
          </div>

          <div className="border border-purple-600 rounded-lg p-4 bg-black/30">
            <h3 className="text-lg font-semibold text-purple-400">
              Missões
            </h3>
            <p className="text-sm text-gray-300">
              Complete missões para ganhar pontos.
            </p>
          </div>

          <div className="border border-purple-600 rounded-lg p-4 bg-black/30">
            <h3 className="text-lg font-semibold text-purple-400">
              Perfil
            </h3>
            <p className="text-sm text-gray-300">
              Personalize seu perfil geek.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
