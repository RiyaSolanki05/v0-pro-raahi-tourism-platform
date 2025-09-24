import { PlanningInterface } from "@/components/planning/planning-interface"
import { Header } from "@/components/header"

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Plan Your Jharkhand Journey</h1>
            <p className="text-muted-foreground">
              Fill out your preferences and let our AI create the perfect itinerary for you
            </p>
          </div>
          <PlanningInterface />
        </div>
      </main>
    </div>
  )
}
