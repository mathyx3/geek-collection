"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get("code");
      if (!code) return;

      await supabase.auth.exchangeCodeForSession(code);

      router.replace("/dashboard");
    };

    handleAuth();
  }, [router, searchParams]);

  return <div>Finalizando login...</div>;
}
