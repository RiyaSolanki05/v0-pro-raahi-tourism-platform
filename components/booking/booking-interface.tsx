"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransportationBooking } from "./transportation-booking"
import { AccommodationBooking } from "./accommodation-booking"
import { GuideBooking } from "./guide-booking"
import { ActivityBooking } from "./activity-booking"
import { Train, Hotel, Users, Calendar } from "lucide-react"

export function BookingInterface() {
  const [activeTab, setActiveTab] = useState("transportation")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="transportation" className="flex items-center space-x-2">
          <Train className="w-4 h-4" />
          <span className="hidden sm:inline">Transportation</span>
        </TabsTrigger>
        <TabsTrigger value="accommodation" className="flex items-center space-x-2">
          <Hotel className="w-4 h-4" />
          <span className="hidden sm:inline">Hotels</span>
        </TabsTrigger>
        <TabsTrigger value="guides" className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">Guides</span>
        </TabsTrigger>
        <TabsTrigger value="activities" className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Activities</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="transportation">
        <TransportationBooking />
      </TabsContent>
      <TabsContent value="accommodation">
        <AccommodationBooking />
      </TabsContent>
      <TabsContent value="guides">
        <GuideBooking />
      </TabsContent>
      <TabsContent value="activities">
        <ActivityBooking />
      </TabsContent>
    </Tabs>
  )
}
