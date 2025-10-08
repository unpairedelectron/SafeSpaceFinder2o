import Header from '@/components/Header'

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Careers</h1>
        <p className="text-muted-foreground">
          Were not hiring yet, but wed love your contributions via our community and open-source repository.
        </p>
      </section>
    </div>
  )
}
