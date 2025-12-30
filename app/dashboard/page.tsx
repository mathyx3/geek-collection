"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  if (loading) return <p>Carregando...</p>

  return (
    <div>
      <h1>Bem-vindo 🎉</h1>
      <p>Você está logado.</p>
    </div>
  )
}
