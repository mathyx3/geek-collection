"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const saveProfile = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    await supabase.from("profiles").upsert({
      id: data.user.id,
      username,
    });

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl text-purple-500 mb-4">Criar Perfil</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Seu nickname"
        className="p-3 rounded bg-zinc-900 mb-4"
      />

      <button
        onClick={saveProfile}
        className="px-6 py-3 bg-purple-600 rounded"
      >
        Salvar
      </button>
    </main>
  );
}
