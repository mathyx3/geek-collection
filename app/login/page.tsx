"use client"

import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <button
        onClick={signInWithGoogle}
        className="bg-red-600 text-white px-6 py-3 rounded"
      >
        Entrar com Google
      </button>
    </main>
  )
}
