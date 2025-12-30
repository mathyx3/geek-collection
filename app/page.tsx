"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

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
      <h1 style={{ fontSize: 40 }}>Geek Collection</h1>

      <button
        onClick={() => router.push("/signup")}
        style={{ padding: "12px 24px", fontSize: 16 }}
      >
        Sign Up
      </button>

      <button
        onClick={() => router.push("/login")}
        style={{ padding: "12px 24px", fontSize: 16 }}
      >
        Login
      </button>
    </main>
  )
}
