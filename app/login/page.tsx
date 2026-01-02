"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?type=login`,
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <button
        onClick={login}
        className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700"
      >
        Entrar com Google
      </button>
    </main>
  );
}
