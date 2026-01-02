"use client";

import { supabase } from "@/lib/supabase/client";

export default function SignUp() {
  const signUpWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/perfil`
      }
    });
  };

  return (
    <main style={{ padding: 50 }}>
      <h2>Criar conta</h2>
      <button onClick={signUpWithGoogle}>
        Criar conta com Google
      </button>
    </main>
  );
}
