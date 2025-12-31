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
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    // Pega missões que o usuário AINDA NÃO concluiu
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('active', true)
      .not(
        'id',
        'in',
        `(
          select mission_id
          from user_missions
          where user_id = '${user.id}'
        )`
      )

    if (!error && data) {
      setMissions(data)
    }

    setLoading(false)
  }

  async function completeMission(mission: Mission) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // Registra missão concluída
    const { error } = await supabase.from('user_missions').insert({
      user_id: user.id,
      mission_id: mission.id,
      points_earned: mission.reward_points,
    })

    if (error) {
      alert('Missão já concluída ou erro.')
      return
    }

    // Soma pontos no perfil
    await supabase.rpc('add_points', {
      uid: user.id,
      points: mission.reward_points,
    })

    alert('Pontos adicionados!')
    fetchMissions()
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Carregando missões...</p>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Missões</h1>

      {missions.length === 0 && (
        <p>Nenhuma missão disponível.</p>
      )}

      {missions.map((mission) => (
        <div
          key={mission.id}
          style={{
            marginBottom: 16,
            padding: 16,
            border: '1px solid #333',
            borderRadius: 8,
          }}
        >
          <h3>{mission.title}</h3>
          <p>{mission.description}</p>
          <strong>+{mission.reward_points} pontos</strong>
          <br />
          <button
            onClick={() => completeMission(mission)}
            style={{ marginTop: 10 }}
          >
            Concluir missão
          </button>
        </div>
      ))}
    </div>
  )
}
