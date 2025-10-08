import Header from '@/components/Header'

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Our Mission</h1>
        <p className="text-muted-foreground">
          We aim to empower communities to find and contribute to safe, inclusive, and accessible spaces worldwide.
        </p>
      </section>
    </div>
  )
}
