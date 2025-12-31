"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Mission = {
  id: string;
  title: string;
  description: string;
  reward_points: number;
};

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMissions = async () => {
      const { data, error } = await supabase
        .from("missions")
        .select("*")
        .eq("active", true);

      if (!error && data) {
        setMissions(data);
      }

      setLoading(false);
    };

    loadMissions();
  }, []);

  const completeMission = async (missionId: string, points: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return alert("Não logado");

    // registra missão concluída
    await supabase.from("user_missions").insert({
      user_id: user.id,
      mission_id: missionId,
    });

    // adiciona pontos
    await supabase.rpc("add_points", {
      uid: user.id,
      amount: points,
    });

    alert("Missão concluída! Pontos adicionados.");
  };

  if (loading) return <p>Carregando missões...</p>;

  return (
    <main style={{ padding: 32 }}>
      <h1>Missões</h1>

      {missions.length === 0 && <p>Nenhuma missão disponível.</p>}

      {missions.map((mission) => (
        <div
          key={mission.id}
          style={{
            background: "#111",
            border: "1px solid #6d28d9",
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <h3>{mission.title}</h3>
          <p>{mission.description}</p>
          <strong>{mission.reward_points} pontos</strong>
          <br />
          <button
            onClick={() =>
              completeMission(mission.id, mission.reward_points)
            }
          >
            Concluir missão
          </button>
        </div>
      ))}
    </main>
  );
}
