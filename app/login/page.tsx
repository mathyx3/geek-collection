"use client";

import { supabase } from "@/lib/supabase/client";

export default function Login() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`
      }
    });
  };

  return (
    <main style={{ padding: 50 }}>
      <h2>Login</h2>
      <button onClick={loginWithGoogle}>
        Entrar com Google
      </button>
    </main>
  );
}
