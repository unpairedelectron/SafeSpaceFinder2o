import Header from '@/components/Header'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Your privacy is important to us. Were committed to protecting your data.</p>
      </section>
    </div>
  )
}
