"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [nickname, setNickname] = useState("")
  const [bio, setBio] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUserId(user.id)

      const { data } = await supabase
        .from("profiles")
        .select("nickname, bio")
        .eq("id", user.id)
        .single()

      if (data) {
        setNickname(data.nickname ?? "")
        setBio(data.bio ?? "")
      }

      setLoading(false)
    }

    loadProfile()
  }, [router])

  const saveProfile = async () => {
    if (!userId) return

    await supabase.from("profiles").upsert({
      id: userId,
      nickname,
      bio,
    })

    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando perfil...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/60 border border-purple-600 rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-purple-400">
          Criar seu perfil
        </h1>

        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 rounded bg-black border border-purple-600 outline-none"
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 rounded bg-black border border-purple-600 outline-none"
        />

        <button
          onClick={saveProfile}
          className="w-full bg-purple-600 hover:bg-purple-700 transition rounded p-2 font-semibold"
        >
          Salvar perfil
        </button>
      </div>
    </div>
  )
}
