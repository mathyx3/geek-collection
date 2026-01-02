"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")

    if (!code) {
      router.replace("/")
      return
    }

    supabase.auth.exchangeCodeForSession(code).then(() => {
      router.replace("/dashboard")
    })
  }, [router, searchParams])

  return (
    <div style={{ color: "white", textAlign: "center", marginTop: 50 }}>
      Finalizando login...
    </div>
  )
}
