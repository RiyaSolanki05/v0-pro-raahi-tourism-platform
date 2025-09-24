"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, MapPin, Star, Palette, Mountain, TreePine, Heart } from "lucide-react"

const activities = [
  {
    id: 1,
    title: "Sohrai Art Workshop",
    category: "Art & Culture",
    location: "Hazaribagh",
    duration: "4 hours",
    groupSize: "6-12 people",
    price: 1500,
    rating: 4.8,
    reviews: 45,
    image: "/sohrai-art-workshop.jpg",
    description:
      "Learn the traditional Sohrai wall painting technique from local artists. Includes materials and lunch.",
    highlights: [
      "UNESCO recognized art form",
      "Local artist instruction",
      "Take home your artwork",
      "Traditional lunch",
    ],
    icon: Palette,
  },
  {
    id: 2,
    title: "Dokra Metal Craft Experience",
    category: "Art & Culture",
    location: "Ranchi",
    duration: "6 hours",
    groupSize: "4-8 people",
    price: 2200,
    rating: 4.9,
    reviews: 32,
    image: "/dokra-metal-craft.jpg",
    description:
      "Hands-on experience creating traditional Dokra metal artifacts using ancient lost-wax casting technique.",
    highlights: [
      "Ancient casting technique",
      "Create your own piece",
      "Master craftsman guidance",
      "Cultural storytelling",
    ],
    icon: Palette,
  },
  {
    id: 3,
    title: "Netarhat Sunrise Trek",
    category: "Adventure",
    location: "Netarhat",
    duration: "8 hours",
    groupSize: "8-15 people",
    price: 1800,
    rating: 4.7,
    reviews: 89,
    image: "/netarhat-sunrise-trek.jpg",
    description: "Early morning trek to witness spectacular sunrise from Queen of Chotanagpur plateau.",
    highlights: ["Spectacular sunrise views", "Professional guide", "Breakfast included", "Photography spots"],
    icon: Mountain,
  },
  {
    id: 4,
    title: "Betla National Park Safari",
    category: "Wildlife",
    location: "Betla",
    duration: "5 hours",
    groupSize: "6-10 people",
    price: 2500,
    rating: 4.6,
    reviews: 67,
    image: "/betla-national-park-safari.jpg",
    description:
      "Wildlife safari in Betla National Park with chances to spot elephants, tigers, and various bird species.",
    highlights: ["Wildlife photography", "Expert naturalist", "Jeep safari", "Bird watching"],
    icon: TreePine,
  },
  {
    id: 5,
    title: "Deoghar Temple Circuit",
    category: "Spiritual",
    location: "Deoghar",
    duration: "6 hours",
    groupSize: "10-20 people",
    price: 1200,
    rating: 4.8,
    reviews: 156,
    image: "/deoghar-temple-circuit.jpg",
    description: "Spiritual journey covering major temples including Baidyanath Jyotirlinga with cultural insights.",
    highlights: ["Sacred Jyotirlinga", "Cultural significance", "Local guide", "Prasad included"],
    icon: Heart,
  },
  {
    id: 6,
    title: "Karma Festival Celebration",
    category: "Festival",
    location: "Various Villages",
    duration: "Full Day",
    groupSize: "15-25 people",
    price: 3000,
    rating: 4.9,
    reviews: 78,
    image: "/karma-festival-celebration.jpg",
    description: "Participate in authentic Karma festival celebrations with tribal communities.",
    highlights: ["Traditional dance", "Community feast", "Cultural immersion", "Festival participation"],
    icon: Calendar,
  },
]

export function ActivityBooking() {
  const [filters, setFilters] = useState({
    category: "All categories",
    location: "All locations",
    priceRange: "All prices",
  })

  const filteredActivities = activities.filter((activity) => {
    if (filters.category !== "All categories" && activity.category !== filters.category) return false
    if (filters.location !== "All locations" && activity.location !== filters.location) return false
    if (filters.priceRange !== "All prices") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      if (activity.price < min || activity.price > max) return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Discover Activities & Experiences</CardTitle>
          <CardDescription>Immerse yourself in Jharkhand's culture, nature, and traditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All categories">All categories</SelectItem>
                  <SelectItem value="Art & Culture">Art & Culture</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Wildlife">Wildlife</SelectItem>
                  <SelectItem value="Spiritual">Spiritual</SelectItem>
                  <SelectItem value="Festival">Festival</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select
                value={filters.location}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All locations">All locations</SelectItem>
                  <SelectItem value="Ranchi">Ranchi</SelectItem>
                  <SelectItem value="Hazaribagh">Hazaribagh</SelectItem>
                  <SelectItem value="Netarhat">Netarhat</SelectItem>
                  <SelectItem value="Betla">Betla</SelectItem>
                  <SelectItem value="Deoghar">Deoghar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All prices">All prices</SelectItem>
                  <SelectItem value="0-1500">₹0 - ₹1,500</SelectItem>
                  <SelectItem value="1500-2500">₹1,500 - ₹2,500</SelectItem>
                  <SelectItem value="2500-4000">₹2,500+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="hover:border-primary/50 transition-colors overflow-hidden">
            <div className="relative">
              <img
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3" variant="secondary">
                {activity.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold line-clamp-1">{activity.title}</h3>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>
                    {activity.rating} ({activity.reviews})
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{activity.location}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{activity.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span>{activity.groupSize}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {activity.highlights.slice(0, 2).map((highlight) => (
                  <Badge key={highlight} variant="outline" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">₹{activity.price}</span>
                  <span className="text-sm text-muted-foreground">/person</span>
                </div>
                <Button size="sm">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
