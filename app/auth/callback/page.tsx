"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchangeCode = async () => {
      const code = searchParams.get("code");

      if (!code) {
        router.replace("/login");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Erro no callback:", error.message);
        router.replace("/login");
        return;
      }

      // depois do login OAuth, decide pra onde ir
      router.replace("/dashboard");
    };

    exchangeCode();
  }, [router, searchParams]);

  return (
    <div style={{ color: "white", textAlign: "center", marginTop: 50 }}>
      Finalizando login...
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div style={{ color: "white" }}>Carregando…</div>}>
      <CallbackInner />
    </Suspense>
  );
}
