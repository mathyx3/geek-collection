"use client"

import { supabase } from "@/lib/supabase/client"

export default function SignUp() {
  const handleGoogleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <h1>Sign Up</h1>

      <button
        onClick={handleGoogleSignUp}
        style={{ padding: "12px 24px", fontSize: 16 }}
      >
        Criar conta com Google
      </button>
    </main>
  )
}
