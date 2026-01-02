"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.session.user.id)
        .single();

      if (!profile) {
        router.replace("/perfil");
        return;
      }

      setLoading(false);
    });
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <main style={{ padding: 50 }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao Geek Collection</p>
    </main>
  );
}
