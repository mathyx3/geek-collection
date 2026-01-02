"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  return (
    <main style={{ textAlign: "center", paddingTop: 100 }}>
      <h1>Geek Collection</h1>

      <div style={{ marginTop: 30 }}>
        <button onClick={() => router.push("/login")}>Login</button>
        <button onClick={() => router.push("/signup")} style={{ marginLeft: 10 }}>
          Sign Up
        </button>
      </div>
    </main>
  );
}
