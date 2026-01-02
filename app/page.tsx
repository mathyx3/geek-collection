"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold text-purple-500 mb-8">
        Geek Collection
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/signup")}
          className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700"
        >
          Sign Up
        </button>

        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 border border-purple-500 rounded hover:bg-purple-900"
        >
          Login
        </button>
      </div>
    </main>
  );
}
