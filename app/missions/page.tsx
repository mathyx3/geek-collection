'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Mission = {
  id: string
  title: string
  description: string
  reward_points: number
}

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [completed, setCompleted] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    // Buscar missões ativas
    const { data: missionsData } = await supabase
      .from('missions')
      .select('*')
      .eq('active', true)

    // Buscar missões já concluídas pelo usuário
    const { data: userMissions } = await supabase
      .from('user_missions')
      .select('mission_id')
      .eq('user_id', user.id)

    setMissions(missionsData || [])
    setCompleted(userMissions?.map(m => m.mission_id) || [])
    setLoading(false)
  }

  async function completeMission(mission: Mission) {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    // Verificação extra de segurança
    if (completed.includes(mission.id)) {
      alert('Missão já concluída.')
      return
    }

    // Registrar missão concluída
    const { error: missionError } = await supabase
      .from('user_missions')
      .insert({
        user_id: user.id,
        mission_id: mission.id
      })

    if (missionError) {
      alert('Erro ao concluir missão.')
      return
    }

    // Adicionar pontos ao perfil
    const { error: pointsError } = await supabase.rpc(
      'add_points',
      { uid: user.id, points_to_add: mission.reward_points }
    )

    if (pointsError) {
      alert('Erro ao adicionar pontos.')
      return
    }

    alert('Missão concluída! Pontos adicionados.')
    loadData()
  }

  if (loading) return <p>Carregando missões...</p>

  return (
    <div style={{ padding: 24 }}>
      <h1>Missões</h1>

      {missions.map(mission => {
        const done = completed.includes(mission.id)

        return (
          <div
            key={mission.id}
            style={{
              opacity: done ? 0.5 : 1,
              border: '1px solid #333',
              borderRadius: 8,
              padding: 16,
              marginBottom: 12
            }}
          >
            <h3>{mission.title}</h3>
            <p>{mission.description}</p>
            <strong>+{mission.reward_points} pontos</strong>

            <br />

            <button
              disabled={done}
              onClick={() => completeMission(mission)}
              style={{ marginTop: 8 }}
            >
              {done ? 'Concluída' : 'Concluir missão'}
            </button>
          </div>
        )
      })}
    </div>
  )
}
