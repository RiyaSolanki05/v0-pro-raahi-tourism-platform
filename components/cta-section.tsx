import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-bounce-gentle"></div>
      <div
        className="absolute bottom-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/15 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Your Adventure Starts Here</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight">
            Ready to Fall in Love with
            <span className="text-primary block md:inline"> Jharkhand</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Your perfect Jharkhand adventure is just a conversation away. Let our AI travel companion craft an
            unforgettable journey that's uniquely yours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link href="/chat">
                <MessageCircle className="mr-2 w-5 h-5" />
                Start Chatting Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/plan">
                Browse Adventures
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p className="flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4 text-primary fill-current" />
              <span>Loved by travelers</span>
              <span>•</span>
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Powered by AI</span>
              <span>•</span>
              <span>Celebrating Jharkhand's beauty</span>
            </p>
            <p className="text-xs opacity-75">
              Join hundreds of happy travelers who discovered Jharkhand with ProRaahi
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
