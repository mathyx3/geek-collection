"use client"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-400">
        Bem-vindo ao Geek Collection
      </h2>

      <p className="text-gray-300">
        Complete missões, ganhe pontos e construa sua coleção digital geek.
      </p>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#16001f] border border-purple-800 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-purple-300">
            🎯 Missões Ativas
          </h3>
          <p className="text-gray-400 mt-2">
            Complete tarefas e ganhe pontos.
          </p>
        </div>

        <div className="bg-[#16001f] border border-purple-800 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-purple-300">
            💰 Pontos
          </h3>
          <p className="text-gray-400 mt-2">
            Seus pontos ficam aqui.
          </p>
        </div>

        <div className="bg-[#16001f] border border-purple-800 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-purple-300">
            🧩 Coleção
          </h3>
          <p className="text-gray-400 mt-2">
            Veja seus itens raros.
          </p>
        </div>
      </div>
    </div>
  )
}
