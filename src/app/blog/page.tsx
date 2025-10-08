import Header from '@/components/Header'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground">Stories and updates from the community.</p>
      </section>
    </div>
  )
}
