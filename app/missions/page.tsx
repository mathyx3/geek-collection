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
    loadMissions()
  }, [])

  async function loadMissions() {
    setLoading(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    // Buscar missões NÃO concluídas
    const { data, error } = await supabase
      .from("missions")
      .select(`
        id,
        title,
        description,
        reward_points
      `)
      .eq("active", true)
      .not(
        "id",
        "in",
        `(select mission_id from user_missions where user_id = '${user.id}')`
      )

    if (!error && data) {
      setMissions(data)
    }

    setLoading(false)
  }

  async function completeMission(missionId: string) {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("user_missions").insert({
      user_id: user.id,
      mission_id: missionId
    })

    // Remove da tela sem reload
    setMissions(prev => prev.filter(m => m.id !== missionId))
  }

  if (loading) return <p>Carregando missões...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>Missões</h1>

      {missions.length === 0 && (
        <p>Nenhuma missão disponível 🎉</p>
      )}

      {missions.map(mission => (
        <div
          key={mission.id}
          style={{
            border: "1px solid #444",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12
          }}
        >
          <h3>{mission.title}</h3>
          <p>{mission.description}</p>
          <p>Recompensa: {mission.reward_points} pontos</p>

          <button onClick={() => completeMission(mission.id)}>
            Concluir missão
          </button>
        </div>
      ))}
    </div>
  )
}
