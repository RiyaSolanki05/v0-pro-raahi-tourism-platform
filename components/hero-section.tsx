import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/15 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-primary/20">
            <Heart className="w-4 h-4 fill-current" />
            <span>Experience Jharkhand's Magic</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 leading-tight">
            Your Perfect
            <span className="text-primary block md:inline"> Jharkhand</span>
            <br />
            <span className="text-secondary">Adventure</span> Awaits
          </h1>

          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover ancient tribal traditions, explore pristine waterfalls, and immerse yourself in vibrant festivals.
            Our AI companion makes every moment of your Jharkhand journey unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link href="/chat">
                Plan My Adventure
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="#destinations">Explore Destinations</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="tourism-card p-6 animate-slide-in-left">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-accent mr-1 fill-current" />
                <div className="text-3xl font-bold text-primary">50+</div>
              </div>
              <div className="text-sm text-muted-foreground font-medium">Amazing Destinations</div>
            </div>
            <div className="tourism-card p-6 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-5 h-5 text-accent mr-1 fill-current" />
                <div className="text-3xl font-bold text-primary">200+</div>
              </div>
              <div className="text-sm text-muted-foreground font-medium">Happy Travelers</div>
            </div>
            <div className="tourism-card p-6 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 text-accent mr-1" />
                <div className="text-3xl font-bold text-primary">24/7</div>
              </div>
              <div className="text-sm text-muted-foreground font-medium">AI Travel Buddy</div>
            </div>
            <div className="tourism-card p-6 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-accent mr-1 fill-current" />
                <div className="text-3xl font-bold text-primary">15+</div>
              </div>
              <div className="text-sm text-muted-foreground font-medium">Cultural Festivals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
