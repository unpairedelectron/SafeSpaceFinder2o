import Header from '@/components/Header'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Use of this service is subject to terms that ensure community safety and respect.</p>
      </section>
    </div>
  )
}
