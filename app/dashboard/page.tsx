"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-purple-400">
        Dashboard
      </h1>

      <p className="text-gray-300">
        Logado como <span className="text-purple-300">{email}</span>
      </p>

      <div className="grid gap-4">
        <div className="border border-purple-600 rounded-lg p-4">
          <h2 className="text-xl text-purple-300">Colecionáveis</h2>
          <p className="text-gray-400">
            Em breve você verá seus itens digitais aqui.
          </p>
        </div>

        <div className="border border-purple-600 rounded-lg p-4">
          <h2 className="text-xl text-purple-300">Missões</h2>
          <p className="text-gray-400">
            Complete missões para ganhar pontos.
          </p>
        </div>

        <div className="border border-purple-600 rounded-lg p-4">
          <h2 className="text-xl text-purple-300">Perfil</h2>
          <p className="text-gray-400">
            Personalize seu perfil geek.
          </p>
        </div>
      </div>
    </div>
  )
}
