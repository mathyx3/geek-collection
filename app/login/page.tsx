"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email
    })

    if (error) setMsg("Erro ao enviar email")
    else setMsg("Confira seu email 📩")
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="seu@email.com"
          className="w-full p-2 rounded mb-4 text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={signIn}
          className="w-full bg-purple-600 py-2 rounded"
        >
          Entrar
        </button>

        {msg && <p className="mt-4 text-sm">{msg}</p>}
      </div>
    </main>
  )
}
