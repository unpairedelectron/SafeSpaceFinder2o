import Header from '@/components/Header'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Accessibility</h1>
        <p className="text-muted-foreground">We adhere to WCAG guidelines and strive for inclusive design throughout the app.</p>
      </section>
    </div>
  )
}
