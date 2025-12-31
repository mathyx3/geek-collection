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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMissions()
  }, [])

  async function fetchMissions() {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('active', true)

    if (error) {
      console.error('Erro ao buscar missões:', error)
    } else {
      setMissions(data || [])
    }

    setLoading(false)
  }

  async function completeMission(missionId: string, points: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Usuário não autenticado')
      return
    }

    // evita missão duplicada
    const { data: existing } = await supabase
      .from('user_missions')
      .select('id')
      .eq('user_id', user.id)
      .eq('mission_id', missionId)
      .single()

    if (existing) {
      alert('Missão já concluída ou erro.')
      return
    }

    // registra missão
    const { error: insertError } = await supabase
      .from('user_missions')
      .insert({
        user_id: user.id,
        mission_id: missionId,
      })

    if (insertError) {
      console.error(insertError)
      alert('Erro ao concluir missão')
      return
    }

    // adiciona pontos no perfil
    const { error: pointsError } = await supabase.rpc('add_points', {
      user_id_input: user.id,
      points_input: points,
    })

    if (pointsError) {
      console.error(pointsError)
      alert('Erro ao adicionar pontos')
      return
    }

    alert('Missão concluída! Pontos adicionados.')
  }

  if (loading) {
    return <p>Carregando missões...</p>
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Missões</h1>

      {missions.length === 0 && <p>Nenhuma missão disponível.</p>}

      {missions.map((mission) => (
        <div
          key={mission.id}
          style={{
            border: '1px solid #333',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <h3>{mission.title}</h3>
          <p>{mission.description}</p>
          <strong>+{mission.reward_points} pontos</strong>

          <br />

          <button
            style={{ marginTop: 10 }}
            onClick={() =>
              completeMission(mission.id, mission.reward_points)
            }
          >
            Concluir missão
          </button>
        </div>
      ))}
    </div>
  )
}
