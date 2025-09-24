import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Train, TreePine, Calendar, Palette, Mountain, Heart, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Train,
    title: "Seamless Transportation",
    description: "Travel in comfort with our smart booking system",
    features: ["Real-time train schedules", "Local transport options", "Best route planning"],
    color: "from-primary/20 to-primary/10",
  },
  {
    icon: TreePine,
    title: "Nature Adventures",
    description: "Discover Jharkhand's pristine wilderness",
    features: ["Guided forest walks", "Wildlife spotting", "Eco-friendly tours"],
    color: "from-secondary/20 to-secondary/10",
  },
  {
    icon: Calendar,
    title: "Festival Experiences",
    description: "Join authentic cultural celebrations",
    features: ["Festival calendars", "Cultural workshops", "Traditional performances"],
    color: "from-accent/20 to-accent/10",
  },
  {
    icon: Palette,
    title: "Artisan Workshops",
    description: "Learn from master craftspeople",
    features: ["Sohrai art classes", "Dokra metal work", "Take home your creations"],
    color: "from-primary/20 to-accent/10",
  },
  {
    icon: Mountain,
    title: "Thrilling Adventures",
    description: "Push your limits in stunning landscapes",
    features: ["Rock climbing", "Trekking expeditions", "Adventure photography"],
    color: "from-secondary/20 to-primary/10",
  },
  {
    icon: Heart,
    title: "Spiritual Journeys",
    description: "Find peace in sacred spaces",
    features: ["Temple pilgrimages", "Meditation retreats", "Spiritual guidance"],
    color: "from-accent/20 to-secondary/10",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Your Complete <span className="text-secondary">Jharkhand</span> Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From the moment you arrive to your last goodbye, we're here to make every experience unforgettable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="tourism-card group cursor-pointer animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border-primary/20 hover:border-primary bg-transparent"
                >
                  Explore This
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
