import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Shield, Compass, Camera } from "lucide-react"

const features = [
  {
    icon: Compass,
    title: "Your AI Travel Companion",
    description:
      "Meet your personal travel buddy who knows Jharkhand inside out. From hidden waterfalls to local festivals, get personalized recommendations that match your adventure style.",
  },
  {
    icon: MapPin,
    title: "Live Local Intelligence",
    description:
      "Stay updated with real-time weather, local events, and safety information. Know the best times to visit each destination and what's happening around you.",
  },
  {
    icon: Calendar,
    title: "Tailored Adventures",
    description:
      "Whether you're seeking spiritual peace, adrenaline-pumping adventures, or cultural immersion, we craft the perfect itinerary just for you.",
  },
  {
    icon: Users,
    title: "Authentic Local Guides",
    description:
      "Connect with passionate local storytellers who'll share the real Jharkhand - from ancient tribal legends to the best street food spots.",
  },
  {
    icon: Camera,
    title: "Cultural Treasures",
    description:
      "Dive deep into Jharkhand's rich heritage - learn Sohrai wall art, witness Dokra metal crafting, and dance at vibrant festivals like Sarhul and Karma.",
  },
  {
    icon: Shield,
    title: "Worry-Free Booking",
    description:
      "Book with confidence using our secure platform. Multiple payment options, instant confirmations, and 24/7 support for peace of mind.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-accent/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Why Travelers <span className="text-primary">Love</span> ProRaahi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience Jharkhand like never before with intelligent planning, local expertise, and authentic cultural
            connections
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="tourism-card group cursor-pointer animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl text-balance group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
