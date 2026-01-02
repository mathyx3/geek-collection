"use client";

import { supabase } from "@/lib/supabase/client";

export default function SignUpPage() {
  const signup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?type=signup`,
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <button
        onClick={signup}
        className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700"
      >
        Criar conta com Google
      </button>
    </main>
  );
}
