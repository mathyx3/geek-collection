export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold text-purple-400">
        Geek Collection
      </h1>

      <p className="text-gray-300">
        Sua coleção geek em um só lugar
      </p>

      <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
        Entrar com Google
      </button>
    </main>
  )
}
