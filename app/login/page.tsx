"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  // Se já estiver logado, manda direto pro dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/login`,
      },
    });
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <button
        onClick={loginWithGoogle}
        style={{
          padding: 12,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Entrar com Google
      </button>
    </div>
  );
}
