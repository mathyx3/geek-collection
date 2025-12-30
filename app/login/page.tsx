"use client"

import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const supabase = createClient()

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1 style={{ fontSize: 32 }}>Login</h1>

      <button
        onClick={loginWithGoogle}
        style={{
          padding: "12px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Entrar com Google
      </button>
    </div>
  )
}
