import Header from '@/components/Header'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">We use cookies to improve your experience. Manage preferences in Settings.</p>
      </section>
    </div>
  )
}
