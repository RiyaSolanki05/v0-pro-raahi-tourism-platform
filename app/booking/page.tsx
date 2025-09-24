import { BookingInterface } from "@/components/booking/booking-interface"
import { Header } from "@/components/header"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Book Your Jharkhand Experience</h1>
            <p className="text-muted-foreground">
              Transportation, accommodations, guides, and activities - all in one place
            </p>
          </div>
          <BookingInterface />
        </div>
      </main>
    </div>
  )
}
