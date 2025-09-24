"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Languages, Award, Calendar } from "lucide-react"

const guides = [
  {
    id: 1,
    name: "Rajesh Kumar",
    avatar: "/indian-guide-male.jpg",
    rating: 4.9,
    reviews: 127,
    languages: ["Hindi", "English", "Santhali"],
    specialties: ["Cultural Heritage", "Tribal History", "Local Festivals"],
    location: "Ranchi",
    experience: "8 years",
    pricePerDay: 2500,
    availability: "Available",
    description:
      "Expert in Jharkhand's tribal culture and traditional festivals. Certified guide with deep knowledge of Sohrai art and local customs.",
  },
  {
    id: 2,
    name: "Priya Devi",
    avatar: "/indian-guide-female.jpg",
    rating: 4.8,
    reviews: 89,
    languages: ["Hindi", "English", "Bengali"],
    specialties: ["Art & Crafts", "Dokra Workshops", "Women's Cooperatives"],
    location: "Jamshedpur",
    experience: "6 years",
    pricePerDay: 2200,
    availability: "Available",
    description:
      "Specializes in traditional crafts and women's empowerment programs. Connects visitors with local artisan communities.",
  },
  {
    id: 3,
    name: "Amit Singh",
    avatar: "/indian-guide-adventure.jpg",
    rating: 4.7,
    reviews: 156,
    languages: ["Hindi", "English"],
    specialties: ["Adventure Tourism", "Trekking", "Wildlife"],
    location: "Hazaribagh",
    experience: "10 years",
    pricePerDay: 3000,
    availability: "Busy until Dec 15",
    description:
      "Adventure specialist with extensive knowledge of Jharkhand's national parks and trekking routes. Safety certified.",
  },
  {
    id: 4,
    name: "Sunita Kumari",
    avatar: "/indian-guide-spiritual.jpg",
    rating: 4.9,
    reviews: 203,
    languages: ["Hindi", "English", "Sanskrit"],
    specialties: ["Spiritual Sites", "Temple History", "Meditation"],
    location: "Deoghar",
    experience: "12 years",
    pricePerDay: 2800,
    availability: "Available",
    description:
      "Spiritual guide with deep knowledge of Jharkhand's sacred sites and religious traditions. Meditation instructor.",
  },
]

export function GuideBooking() {
  const [filters, setFilters] = useState({
    location: "",
    specialty: "",
    priceRange: "",
  })

  const filteredGuides = guides.filter((guide) => {
    if (filters.location && guide.location !== filters.location) return false
    if (filters.specialty && !guide.specialties.some((s) => s.includes(filters.specialty))) return false
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      if (guide.pricePerDay < min || guide.pricePerDay > max) return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Local Guides</CardTitle>
          <CardDescription>Connect with certified local guides for authentic Jharkhand experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
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
                  <SelectItem value="all">All locations</SelectItem>
                  <SelectItem value="Ranchi">Ranchi</SelectItem>
                  <SelectItem value="Jamshedpur">Jamshedpur</SelectItem>
                  <SelectItem value="Hazaribagh">Hazaribagh</SelectItem>
                  <SelectItem value="Deoghar">Deoghar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Specialty</label>
              <Select
                value={filters.specialty}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, specialty: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All specialties</SelectItem>
                  <SelectItem value="Cultural">Cultural Heritage</SelectItem>
                  <SelectItem value="Art">Art & Crafts</SelectItem>
                  <SelectItem value="Adventure">Adventure Tourism</SelectItem>
                  <SelectItem value="Spiritual">Spiritual Sites</SelectItem>
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
                  <SelectItem value="all">All prices</SelectItem>
                  <SelectItem value="0-2000">₹0 - ₹2,000</SelectItem>
                  <SelectItem value="2000-2500">₹2,000 - ₹2,500</SelectItem>
                  <SelectItem value="2500-3000">₹2,500 - ₹3,000</SelectItem>
                  <SelectItem value="3000-5000">₹3,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
                  <AvatarFallback>
                    {guide.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{guide.name}</h3>
                    <Badge variant={guide.availability === "Available" ? "default" : "secondary"}>
                      {guide.availability}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>
                        {guide.rating} ({guide.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{guide.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      <span>{guide.experience}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4 text-muted-foreground" />
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {guide.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">₹{guide.pricePerDay}</span>
                      <span className="text-sm text-muted-foreground">/day</span>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Check Availability
                      </Button>
                      <Button size="sm" disabled={guide.availability !== "Available"}>
                        Book Guide
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
