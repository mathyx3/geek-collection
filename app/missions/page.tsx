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
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) return
      setUserId(auth.user.id)

      const { data } = await supabase
        .from("missions")
        .select("*")
        .eq("active", true)

      setMissions(data || [])
    }

    loadData()
  }, [])

  const startMission = async (missionId: string) => {
    if (!userId) return

    await supabase.from("user_missions").insert({
      user_id: userId,
      mission_id: missionId,
      status: "active"
    })

    alert("Missão iniciada!")
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Missões</h1>

      {missions.map(mission => (
        <div key={mission.id} style={{ border: "1px solid #444", marginBottom: 12, padding: 12 }}>
          <h3>{mission.title}</h3>
          <p>{mission.description}</p>
          <p>Recompensa: {mission.reward_points} pontos</p>

          <button onClick={() => startMission(mission.id)}>
            Iniciar missão
          </button>
        </div>
      ))}
    </div>
  )
}
