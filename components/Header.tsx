'use client'

import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function Header() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return (
    <header>
      <Link href="/">Home</Link>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </header>
  )
}
