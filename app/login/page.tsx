"use client"

import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      alert("Erro ao entrar com Google")
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl text-white w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Geek Collection
        </h1>

        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Entrar com Google
        </button>
      </div>
    </main>
  )
}
