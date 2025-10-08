'use client'

import Header from '@/components/Header'
import Link from 'next/link'
import { useState } from 'react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              aria-label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded p-2"
            />
          </label>
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              aria-label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full border rounded p-2"
            />
          </label>
          <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded w-full">Create account</button>
        </form>
        <p className="text-sm text-muted-foreground mt-4">
          Already have an account? <Link href="/login" className="text-primary-600 underline">Log in</Link>
        </p>
      </section>
    </div>
  )
}
