"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")

  // Login por email (magic link)
  const signInEmail = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMsg("Erro ao enviar email 😢")
    else setMsg("Verifique seu email 📩")
  }

  // Login com Google OAuth
  const signInGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    })
    if (error) setMsg("Erro no login Google 😢")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-sm text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Geek Collection</h1>

        {/* Input de email */}
        <input
          type="email"
          placeholder="seu@email.com"
          className="w-full p-2 rounded mb-4 text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* Botão login por email */}
        <button
          onClick={signInEmail}
          className="w-full bg-purple-600 py-2 rounded mb-4 hover:bg-purple-700"
        >
          Entrar com Email
        </button>

        {/* Botão login Google */}
        <button
          onClick={signInGoogle}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Entrar com Google
        </button>

        {/* Mensagem de feedback */}
        {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
      </div>
    </main>
  )
}
