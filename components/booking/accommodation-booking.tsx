"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Star, MapPin, Wifi, Car, Coffee, Utensils, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const hotels = [
  {
    id: 1,
    name: "Ranchi Heritage Hotel",
    category: "Heritage",
    location: "Ranchi",
    rating: 4.5,
    reviews: 234,
    price: 4500,
    image: "/heritage-hotel-ranchi.jpg",
    amenities: ["Free WiFi", "Restaurant", "Parking", "Room Service"],
    description: "Beautifully restored heritage property in the heart of Ranchi with traditional architecture.",
  },
  {
    id: 2,
    name: "Eco Lodge Netarhat",
    category: "Eco-Lodge",
    location: "Netarhat",
    rating: 4.7,
    reviews: 89,
    price: 3200,
    image: "/eco-lodge-netarhat.jpg",
    amenities: ["Nature Views", "Organic Food", "Trekking", "Bonfire"],
    description: "Sustainable eco-lodge surrounded by pristine forests with panoramic hill views.",
  },
  {
    id: 3,
    name: "Jamshedpur Business Hotel",
    category: "Business",
    location: "Jamshedpur",
    rating: 4.3,
    reviews: 456,
    price: 3800,
    image: "/business-hotel-jamshedpur.jpg",
    amenities: ["Business Center", "Gym", "Conference Hall", "Airport Shuttle"],
    description: "Modern business hotel with excellent connectivity and professional amenities.",
  },
  {
    id: 4,
    name: "Deoghar Spiritual Retreat",
    category: "Spiritual",
    location: "Deoghar",
    rating: 4.6,
    reviews: 167,
    price: 2800,
    image: "/spiritual-retreat-deoghar.jpg",
    amenities: ["Meditation Hall", "Vegetarian Food", "Temple Proximity", "Yoga Classes"],
    description: "Peaceful retreat near sacred temples, perfect for spiritual seekers and pilgrims.",
  },
]

export function AccommodationBooking() {
  const [searchData, setSearchData] = useState({
    location: "All locations",
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    guests: "2",
    rooms: "1",
  })
  const [searchResults, setSearchResults] = useState(hotels)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let filtered = hotels
    if (searchData.location !== "All locations") {
      filtered = filtered.filter((hotel) => hotel.location === searchData.location)
    }

    setSearchResults(filtered)
    setIsSearching(false)
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "parking":
      case "car":
        return <Car className="w-4 h-4" />
      case "restaurant":
      case "organic food":
      case "vegetarian food":
        return <Utensils className="w-4 h-4" />
      default:
        return <Coffee className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Accommodation</CardTitle>
          <CardDescription>Discover comfortable stays from heritage hotels to eco-lodges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select
                value={searchData.location}
                onValueChange={(value) => setSearchData((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All locations">All locations</SelectItem>
                  <SelectItem value="Ranchi">Ranchi</SelectItem>
                  <SelectItem value="Jamshedpur">Jamshedpur</SelectItem>
                  <SelectItem value="Netarhat">Netarhat</SelectItem>
                  <SelectItem value="Deoghar">Deoghar</SelectItem>
                  <SelectItem value="Hazaribagh">Hazaribagh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Guests</label>
                <Select
                  value={searchData.guests}
                  onValueChange={(value) => setSearchData((prev) => ({ ...prev, guests: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rooms</label>
                <Select
                  value={searchData.rooms}
                  onValueChange={(value) => setSearchData((prev) => ({ ...prev, rooms: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Room" : "Rooms"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !searchData.checkIn && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchData.checkIn ? format(searchData.checkIn, "PPP") : "Check-in date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchData.checkIn}
                    onSelect={(date) => setSearchData((prev) => ({ ...prev, checkIn: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-out Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !searchData.checkOut && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchData.checkOut ? format(searchData.checkOut, "PPP") : "Check-out date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchData.checkOut}
                    onSelect={(date) => setSearchData((prev) => ({ ...prev, checkOut: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full" disabled={isSearching}>
            <Search className="mr-2 h-4 w-4" />
            {isSearching ? "Searching..." : "Search Hotels"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {searchResults.map((hotel) => (
          <Card key={hotel.id} className="hover:border-primary/50 transition-colors overflow-hidden">
            <div className="relative">
              <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
              <Badge className="absolute top-3 left-3" variant="secondary">
                {hotel.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{hotel.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hotel.location}</span>
                <span className="mx-2">•</span>
                <span>{hotel.reviews} reviews</span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{hotel.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-1 text-xs bg-muted/50 px-2 py-1 rounded">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">₹{hotel.price}</span>
                  <span className="text-sm text-muted-foreground">/night</span>
                </div>
                <Button>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
