"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Mission = {
  id: string
  title: string
  description: string
  reward_points: number
}

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMissions = async () => {
      const { data, error } = await supabase
        .from("missions")
        .select("id, title, description, reward_points")
        .eq("active", true)

      if (error) {
        console.error("Erro ao buscar missões:", error)
      } else {
        setMissions(data || [])
      }

      setLoading(false)
    }

    fetchMissions()
  }, [])

  if (loading) {
    return (
      <div className="p-6 text-white">
        Carregando missões...
      </div>
    )
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Missões</h1>

      {missions.length === 0 && (
        <p>Nenhuma missão disponível no momento.</p>
      )}

      <div className="grid gap-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-zinc-900 border border-purple-700 rounded-xl p-4"
          >
            <h2 className="text-xl font-semibold">
              {mission.title}
            </h2>

            <p className="text-zinc-300 mt-2">
              {mission.description}
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-purple-400 font-bold">
                +{mission.reward_points} pontos
              </span>

              <button
                className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg"
                onClick={() =>
                  alert("Missão concluída (simulação)")
                }
              >
                Concluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
