"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function PerfilPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // 🔹 Buscar usuário e perfil
  useEffect(() => {
    const loadProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) {
        router.push("/login");
        return;
      }

      setUser(authData.user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profile) {
        setNickname(profile.nickname || "");
        setBio(profile.bio || "");
        setAvatarUrl(profile.avatar_url || "");
      }

      setLoading(false);
    };

    loadProfile();
  }, [router]);

  // 🔹 Salvar perfil
  const saveProfile = async () => {
    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      nickname,
      bio,
      avatar_url: avatarUrl,
    });

    alert("Perfil salvo com sucesso!");
    router.push("/dashboard");
  };

  if (loading) {
    return <div className="p-6 text-white">Carregando perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Seu Perfil</h1>

      {/* 🔹 PERFIL EDITÁVEL */}
      <div className="bg-black/40 border border-purple-600 rounded-xl p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-black/60 border border-purple-500"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <textarea
          className="w-full mb-3 p-2 rounded bg-black/60 border border-purple-500"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 rounded bg-black/60 border border-purple-500"
          placeholder="URL do avatar (opcional)"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        <button
          onClick={saveProfile}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Salvar perfil
        </button>
      </div>

      {/* 🔹 COLEÇÕES PRINCIPAIS */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Coleções Principais</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Anime", "Games", "Séries"].map((c) => (
            <div
              key={c}
              className="bg-black/40 border border-purple-600 rounded-xl p-4"
            >
              <h3 className="font-bold text-purple-400">{c}</h3>
              <p className="text-sm opacity-80">
                Coleção em desenvolvimento.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 ITENS MAIS RAROS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Itens Mais Raros</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-black/40 border border-purple-600 rounded-xl p-4 text-center"
            >
              <p className="text-purple-400 font-bold">Item Raro #{i}</p>
              <p className="text-xs opacity-70">Raridade: ★★★★★</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
