"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-purple-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-2">Geek Collection</h1>
      <p className="text-gray-300 mb-8 text-center">
        Colecione, organize e mostre seu lado geek 🕹️
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => router.push("/signup")}
          className="bg-purple-600 hover:bg-purple-700 transition rounded-lg py-3 font-semibold"
        >
          Sign Up
        </button>

        <button
          onClick={() => router.push("/login")}
          className="border border-gray-400 hover:bg-white hover:text-black transition rounded-lg py-3 font-semibold"
        >
          Login
        </button>
      </div>
    </main>
  )
}
