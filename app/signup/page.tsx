"use client"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const router = useRouter()

  async function signUpWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Criar conta</h1>

        <button
          onClick={signUpWithGoogle}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-lg font-semibold"
        >
          Criar conta com Google
        </button>

        <p
          className="text-sm text-gray-400 mt-4 cursor-pointer hover:underline"
          onClick={() => router.push("/login")}
        >
          Já tem conta? Fazer login
        </p>
      </div>
    </main>
  )
}
