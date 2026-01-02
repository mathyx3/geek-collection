"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Perfil() {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const salvarPerfil = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      nickname
    });

    router.replace("/dashboard");
  };

  return (
    <main style={{ padding: 50 }}>
      <h2>Criar Perfil</h2>

      <input
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <button onClick={salvarPerfil} style={{ display: "block", marginTop: 20 }}>
        Salvar perfil
      </button>
    </main>
  );
}
