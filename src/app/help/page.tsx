import Header from '@/components/Header'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="text-muted-foreground">Find FAQs and tips for using Safe Space Finder.</p>
      </section>
    </div>
  )
}
