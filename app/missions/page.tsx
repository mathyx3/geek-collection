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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;

      setUserId(auth.user.id);

      const { data } = await supabase
        .from("missions")
        .select("*")
        .eq("active", true);

      setMissions(data || []);
    };

    load();
  }, []);

  const completeMission = async (mission: Mission) => {
    if (!userId) return;

    // 1️⃣ registra missão
    const { error: missionError } = await supabase
      .from("user_missions")
      .insert({
        user_id: userId,
        mission_id: mission.id,
      });

    if (missionError) {
      alert("Missão já concluída ou erro.");
      return;
    }

    // 2️⃣ soma pontos na wallet
    const { data: wallet } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", userId)
      .single();

    if (!wallet) {
      // cria wallet se não existir
      await supabase.from("wallets").insert({
        user_id: userId,
        balance: mission.reward_points,
      });
    } else {
      await supabase
        .from("wallets")
        .update({
          balance: wallet.balance + mission.reward_points,
        })
        .eq("user_id", userId);
    }

    alert("Missão concluída! Pontos adicionados 💜");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Missões</h1>

      {missions.map((mission) => (
        <div
          key={mission.id}
          style={{
            border: "1px solid #444",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8,
          }}
        >
          <h3>{mission.title}</h3>
          <p>{mission.description}</p>
          <strong>+{mission.reward_points} pontos</strong>
          <br />
          <button onClick={() => completeMission(mission)}>
            Concluir missão
          </button>
        </div>
      ))}
    </div>
  );
}
