"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Train, Car, Plane, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function TransportationBooking() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: "1",
    transportType: "",
  })
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock search results
    setSearchResults([
      {
        id: 1,
        type: "train",
        name: "Rajdhani Express",
        from: "Delhi",
        to: "Ranchi",
        departure: "06:00",
        arrival: "18:30",
        duration: "12h 30m",
        price: 2450,
        class: "3AC",
        availability: "Available",
      },
      {
        id: 2,
        type: "train",
        name: "Hatia Express",
        from: "Delhi",
        to: "Ranchi",
        departure: "14:20",
        arrival: "08:45",
        duration: "18h 25m",
        price: 1850,
        class: "SL",
        availability: "Available",
      },
      {
        id: 3,
        type: "flight",
        name: "IndiGo 6E-123",
        from: "Delhi",
        to: "Ranchi",
        departure: "09:15",
        arrival: "11:30",
        duration: "2h 15m",
        price: 8500,
        class: "Economy",
        availability: "Available",
      },
    ])
    setIsSearching(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Transportation</CardTitle>
          <CardDescription>Find trains, flights, and buses to your destination</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select
                value={searchData.from}
                onValueChange={(value) => setSearchData((prev) => ({ ...prev, from: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select departure city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="kolkata">Kolkata</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select
                value={searchData.to}
                onValueChange={(value) => setSearchData((prev) => ({ ...prev, to: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ranchi">Ranchi</SelectItem>
                  <SelectItem value="jamshedpur">Jamshedpur</SelectItem>
                  <SelectItem value="dhanbad">Dhanbad</SelectItem>
                  <SelectItem value="bokaro">Bokaro</SelectItem>
                  <SelectItem value="deoghar">Deoghar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !searchData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchData.date ? format(searchData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchData.date}
                    onSelect={(date) => setSearchData((prev) => ({ ...prev, date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Return Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !searchData.returnDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchData.returnDate ? format(searchData.returnDate, "PPP") : "Return date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchData.returnDate}
                    onSelect={(date) => setSearchData((prev) => ({ ...prev, returnDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <Select
                value={searchData.passengers}
                onValueChange={(value) => setSearchData((prev) => ({ ...prev, passengers: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full" disabled={isSearching}>
            <Search className="mr-2 h-4 w-4" />
            {isSearching ? "Searching..." : "Search Transportation"}
          </Button>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Options</h3>
          {searchResults.map((result) => (
            <Card key={result.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {result.type === "train" && <Train className="w-5 h-5 text-primary" />}
                      {result.type === "flight" && <Plane className="w-5 h-5 text-primary" />}
                      {result.type === "bus" && <Car className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <h4 className="font-semibold">{result.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {result.departure} - {result.arrival} • {result.duration}
                      </p>
                      <p className="text-sm text-muted-foreground">{result.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{result.price}</p>
                    <p className="text-sm text-green-600">{result.availability}</p>
                    <Button className="mt-2">Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
