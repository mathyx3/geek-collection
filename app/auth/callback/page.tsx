"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type");

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return router.push("/");

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user.id)
        .single();

      if (type === "signup" || !profile?.username) {
        router.push("/profile");
      } else {
        router.push("/dashboard");
      }
    };

    handleAuth();
  }, [router, type]);

  return <p className="text-white p-10">Entrando...</p>;
}
