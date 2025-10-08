import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-muted-foreground mb-4">
          Safe Space Finder helps everyone discover inclusive, accessible, and safe spaces.
        </p>
        <p>
          Our mission is to build a community-verified directory with accessibility, identity inclusivity,
          and neurodiversity support at its core.
        </p>
      </section>
    </div>
  )
}
