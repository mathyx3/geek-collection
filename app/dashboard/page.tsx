"use client"

export default function Dashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0014, #1a0028)",
        color: "#fff",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1 style={{ color: "#b86bff" }}>Geek Collection</h1>

        <div
          style={{
            background: "#1f0033",
            padding: "10px 16px",
            borderRadius: "12px",
            fontSize: "14px",
          }}
        >
          👤 Usuário Geek
        </div>
      </header>

      {/* Status */}
      <section
        style={{
          background: "#160022",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "32px",
          border: "1px solid #2d0047",
        }}
      >
        <h2 style={{ color: "#c88bff", marginBottom: "8px" }}>
          Seu progresso
        </h2>
        <p style={{ opacity: 0.85 }}>
          Pontos Geek: <strong>120</strong> • Itens coletados: <strong>3</strong>
        </p>
      </section>

      {/* Coleção */}
      <section>
        <h2 style={{ marginBottom: "16px", color: "#d5a6ff" }}>
          🎴 Minha Coleção
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Card 1 */}
          <ItemCard
            title="Badge Gamer Inicial"
            rarity="Comum"
            description="Item obtido ao criar a conta."
          />

          {/* Card 2 */}
          <ItemCard
            title="Poster Digital Cyberpunk"
            rarity="Raro"
            description="Desbloqueado ao completar uma missão."
          />

          {/* Card 3 */}
          <ItemCard
            title="Skin Geek Exclusiva"
            rarity="Épico"
            description="Item premium da loja."
          />
        </div>
      </section>
    </main>
  )
}

/* Card reutilizável */
function ItemCard({
  title,
  rarity,
  description,
}: {
  title: string
  rarity: string
  description: string
}) {
  return (
    <div
      style={{
        background: "#1b002b",
        borderRadius: "16px",
        padding: "16px",
        border: "1px solid #3b0060",
        boxShadow: "0 0 20px rgba(138, 43, 226, 0.15)",
        transition: "transform 0.2s",
      }}
    >
      <div
        style={{
          height: "120px",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, #3b0060, #6a00a8)",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
        }}
      >
        🎮
      </div>

      <h3 style={{ marginBottom: "6px" }}>{title}</h3>
      <p style={{ fontSize: "13px", opacity: 0.85, marginBottom: "8px" }}>
        {description}
      </p>
      <span
        style={{
          fontSize: "12px",
          color: "#c88bff",
          fontWeight: "bold",
        }}
      >
        {rarity}
      </span>
    </div>
  )
}
