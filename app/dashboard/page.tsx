"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function DashboardPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user.id)
        .single()

      setUserName(profile?.username ?? "Usuário")
    }

    loadUser()
  }, [router])

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0b0614", color: "white" }}>
      
      {/* MENU LATERAL */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: menuOpen ? 0 : "-220px",
          width: "220px",
          height: "100%",
          background: "#12081f",
          padding: "20px",
          transition: "0.3s",
          zIndex: 10
        }}
      >
        <h3 style={{ color: "#a855f7" }}>Geek Collection</h3>

        <button
          onClick={() => router.push("/dashboard")}
          style={menuButton}
        >
          🏠 Dashboard
        </button>

        <button
          onClick={() => router.push("/missions")}
          style={menuButton}
        >
          🎯 Missões
        </button>

        <button
          onClick={() => router.push("/profile")}
          style={menuButton}
        >
          👤 Perfil
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/")
          }}
          style={{ ...menuButton, color: "#f87171" }}
        >
          🚪 Sair
        </button>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, padding: "20px", marginLeft: "0" }}>
        
        {/* BOTÃO HAMBURGUER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            fontSize: "26px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          ☰
        </button>

        <h1 style={{ marginTop: "20px" }}>
          Bem-vindo, <span style={{ color: "#a855f7" }}>{userName}</span>
        </h1>

        <p style={{ opacity: 0.7 }}>
          Seu painel principal do Geek Collection
        </p>

        {/* CONTEÚDO FUTURO */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#140a24",
            borderRadius: "12px"
          }}
        >
          <h3>✨ Em breve</h3>
          <p>Coleções, raridades, carteira de pontos e muito mais.</p>
        </div>

      </div>
    </div>
  )
}

const menuButton = {
  display: "block",
  width: "100%",
  marginTop: "15px",
  background: "none",
  border: "none",
  color: "white",
  fontSize: "16px",
  textAlign: "left" as const,
  cursor: "pointer"
      }
