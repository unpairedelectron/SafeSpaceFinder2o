'use client'

import Header from '@/components/Header'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        {status === 'sent' ? (
          <p className="text-success-600">Thanks! Well get back to you soon.</p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setStatus('sent')
            }}
          >
            <input aria-label="Name" required placeholder="Name" className="w-full border rounded p-2" />
            <input aria-label="Email" type="email" required placeholder="Email" className="w-full border rounded p-2" />
            <textarea aria-label="Message" required placeholder="Message" className="w-full border rounded p-2 h-32" />
            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">Send</button>
          </form>
        )}
      </section>
    </div>
  )
}
