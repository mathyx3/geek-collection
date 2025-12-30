"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [nickname, setNickname] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/")
        return
      }

      setUser(user)
      setAvatar(user.user_metadata.avatar_url ?? "")

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (data) {
        setNickname(data.nickname ?? "")
        setBio(data.bio ?? "")
      }

      setLoading(false)
    }

    loadProfile()
  }, [router])

  const salvarPerfil = async () => {
    if (!user) return

    await supabase.from("profiles").upsert({
      user_id: user.id,
      nickname,
      bio,
      avatar_url: avatar
    })

    alert("Perfil salvo com sucesso!")
  }

  if (loading) {
    return <div className="p-10 text-white">Carregando perfil...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Perfil</h1>

      <div className="max-w-md space-y-4">
        {avatar && (
          <img
            src={avatar}
            className="w-24 h-24 rounded-full border border-purple-500"
          />
        )}

        <div>
          <label className="text-sm text-zinc-400">Email</label>
          <input
            value={user.email}
            disabled
            className="w-full bg-zinc-800 p-2 rounded opacity-70"
          />
        </div>

        <div>
          <label className="text-sm">Nickname</label>
          <input
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            className="w-full bg-zinc-800 p-2 rounded"
            placeholder="Seu nome no site"
          />
        </div>

        <div>
          <label className="text-sm">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full bg-zinc-800 p-2 rounded"
            placeholder="Fale um pouco sobre você"
          />
        </div>

        <button
          onClick={salvarPerfil}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded w-full"
        >
          Salvar perfil
        </button>
      </div>
    </div>
  )
}
