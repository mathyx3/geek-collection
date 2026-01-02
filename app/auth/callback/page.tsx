"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/");
        return;
      }

      // verifica se o perfil existe
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.session.user.id)
        .single();

      if (!profile) {
        router.replace("/profile");
      } else {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  return null;
}
