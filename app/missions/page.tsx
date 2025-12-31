"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Mission = {
  id: string;
  title: string;
  description: string | null;
  reward_points: number;
};

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      const { data, error } = await supabase
        .from("missions")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erro ao buscar missões:", error);
      } else {
        setMissions(data || []);
      }

      setLoading(false);
    };

    fetchMissions();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 24, color: "white" }}>
        Carregando missões...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 24,
        color: "white",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>🎯 Missões</h1>

      {missions.length === 0 && (
        <p>Nenhuma missão disponível no momento.</p>
      )}

      {missions.map((mission) => (
        <div
          key={mission.id}
          style={{
            background: "#111",
            border: "1px solid #6d28d9",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <h2 style={{ fontSize: 20 }}>{mission.title}</h2>
          <p style={{ opacity: 0.8 }}>{mission.description}</p>

          <p style={{ marginTop: 8, color: "#a78bfa" }}>
            ⭐ Recompensa: {mission.reward_points} pontos
          </p>

          <button
            disabled
            style={{
              marginTop: 12,
              padding: "8px 16px",
              background: "#6d28d9",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "not-allowed",
              opacity: 0.7,
            }}
          >
            Concluir missão (em breve)
          </button>
        </div>
      ))}
    </div>
  );
}
