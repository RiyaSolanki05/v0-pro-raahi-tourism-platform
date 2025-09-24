"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function PlanningInterface() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    groupSize: "",
    budget: "",
    interests: [] as string[],
    accommodation: "",
    transportation: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const interests = [
    "Cultural Heritage",
    "Adventure Tourism",
    "Spiritual Sites",
    "Art & Crafts",
    "Wildlife & Nature",
    "Festivals & Events",
    "Local Cuisine",
    "Photography",
  ]

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In real implementation, this would send data to the AI agent
    console.log("Form submitted:", formData)

    setIsSubmitting(false)
    // Redirect to chat with pre-filled context
    window.location.href = "/chat"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Preferences</CardTitle>
        <CardDescription>
          Tell us about your ideal Jharkhand experience and we'll create a personalized itinerary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          {/* Travel Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Group Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="groupSize">Group Size</Label>
              <Select
                value={formData.groupSize}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, groupSize: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo Traveler</SelectItem>
                  <SelectItem value="2">Couple</SelectItem>
                  <SelectItem value="3-5">Small Group (3-5)</SelectItem>
                  <SelectItem value="6-10">Medium Group (6-10)</SelectItem>
                  <SelectItem value="10+">Large Group (10+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range (per person)</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (₹5,000 - ₹15,000)</SelectItem>
                  <SelectItem value="mid">Mid-range (₹15,000 - ₹30,000)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹30,000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label>What interests you most? (Select all that apply)</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={interest} className="text-sm font-normal">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accommodation">Accommodation Preference</Label>
              <Select
                value={formData.accommodation}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, accommodation: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget Hotels/Guesthouses</SelectItem>
                  <SelectItem value="mid">Mid-range Hotels</SelectItem>
                  <SelectItem value="luxury">Luxury Hotels/Resorts</SelectItem>
                  <SelectItem value="heritage">Heritage Properties</SelectItem>
                  <SelectItem value="eco">Eco-lodges</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation Preference</Label>
              <Select
                value={formData.transportation}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, transportation: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transportation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="train">Train + Local Transport</SelectItem>
                  <SelectItem value="flight">Flight + Car Rental</SelectItem>
                  <SelectItem value="car">Private Car with Driver</SelectItem>
                  <SelectItem value="bus">Bus + Local Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests or Requirements</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any dietary restrictions, accessibility needs, or special interests..."
              value={formData.specialRequests}
              onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Your Itinerary...
              </>
            ) : (
              "Create My Jharkhand Experience"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
