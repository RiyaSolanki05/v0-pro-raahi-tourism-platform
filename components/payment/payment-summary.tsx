"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Clock, User, Shield } from "lucide-react"

interface PaymentSummaryProps {
  booking: {
    type: string
    title: string
    date: string
    location: string
    duration: string
    guests: number
    price: number
    guide?: string
    transportation?: string
    accommodation?: string
  }
}

export function PaymentSummary({ booking }: PaymentSummaryProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-white">{booking.title}</h3>
          <Badge variant="outline" className="mt-1 border-green-500 text-green-500">
            {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">{booking.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">{booking.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">{booking.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">{booking.guests} guests</span>
          </div>
        </div>

        {booking.guide && (
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Guide</p>
            <p className="text-white">{booking.guide}</p>
          </div>
        )}

        {booking.transportation && (
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Transportation</p>
            <p className="text-white">{booking.transportation}</p>
          </div>
        )}

        {booking.accommodation && (
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Accommodation</p>
            <p className="text-white">{booking.accommodation}</p>
          </div>
        )}

        <Separator className="bg-gray-700" />

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-green-500">₹{booking.price.toLocaleString()}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Shield className="h-4 w-4" />
          <span>Secure payment protected by SSL</span>
        </div>
      </CardContent>
    </Card>
  )
}
