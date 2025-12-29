"use client"

import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined"
          ? window.location.origin
          : undefined
      }
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6 text-purple-400">
          Entrar
        </h1>

        <button
          onClick={signInWithGoogle}
          className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          Entrar com Google
        </button>
      </div>
    </main>
  )
}
