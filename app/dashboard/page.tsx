"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      setEmail(session.user.email ?? null)
      setLoading(false)
    }

    checkSession()
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
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      <p className="mb-6 text-gray-300">
        Logado como <span className="text-purple-300">{email}</span>
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="border border-purple-700 rounded-xl p-4 bg-black/40">
          <h2 className="text-xl font-semibold text-purple-400">
            Colecionáveis
          </h2>
          <p className="text-gray-400 mt-2">
            Em breve você verá seus itens digitais aqui.
          </p>
        </div>

        <div className="border border-purple-700 rounded-xl p-4 bg-black/40">
          <h2 className="text-xl font-semibold text-purple-400">Missões</h2>
          <p className="text-gray-400 mt-2">
            Complete missões para ganhar pontos.
          </p>
        </div>

        <div className="border border-purple-700 rounded-xl p-4 bg-black/40">
          <h2 className="text-xl font-semibold text-purple-400">Perfil</h2>
          <p className="text-gray-400 mt-2">
            Personalize seu perfil geek.
          </p>
        </div>
      </div>
    </div>
  )
}
