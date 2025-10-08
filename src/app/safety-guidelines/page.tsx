import Header from '@/components/Header'

export default function SafetyGuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Safety Guidelines</h1>
        <ul className="list-disc pl-6 space-y-2">
          <li>Community-verified reviews only</li>
          <li>Respect and inclusivity first</li>
          <li>Report any issues to maintain a safe environment</li>
        </ul>
      </section>
    </div>
  )
}
