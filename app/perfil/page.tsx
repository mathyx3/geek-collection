"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [saved, setSaved] = useState(false)

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
        .select("*")
        .eq("id", user.id)
        .single()

      if (data) {
        setUsername(data.username || "")
        setBio(data.bio || "")
      }

      setLoading(false)
    }

    loadProfile()
  }, [router])

  const saveProfile = async () => {
    if (!userId) return

    setLoading(true)

    await supabase.from("profiles").upsert({
      id: userId,
      username,
      bio
    })

    setSaved(true)
    setLoading(false)

    // Redireciona pro dashboard depois de salvar
    setTimeout(() => {
      router.push("/dashboard")
    }, 800)
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">
          Criar perfil
        </h1>

        <input
          className="w-full p-2 rounded bg-zinc-800 mb-3"
          placeholder="Nickname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          className="w-full p-2 rounded bg-zinc-800 mb-3"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button
          onClick={saveProfile}
          className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded font-bold"
        >
          Salvar perfil
        </button>

        {saved && (
          <p className="text-green-400 text-sm mt-2">
            Perfil salvo com sucesso!
          </p>
        )}
      </div>
    </div>
  )
}
