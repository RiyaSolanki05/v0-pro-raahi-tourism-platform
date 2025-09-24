"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, User, Search, Filter, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Booking {
  id: string
  reference: string
  type: string
  title: string
  date: string
  location: string
  guests: number
  amount: number
  status: "confirmed" | "pending" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  createdAt: string
}

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: "1",
      reference: "PRH-123456",
      type: "activity",
      title: "Hundru Falls Adventure Tour",
      date: "2024-01-15",
      location: "Hundru Falls, Ranchi",
      guests: 2,
      amount: 3500,
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      reference: "PRH-789012",
      type: "guide",
      title: "Local Guide - Ravi Kumar",
      date: "2024-01-20",
      location: "Betla National Park",
      guests: 4,
      amount: 2000,
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      reference: "PRH-345678",
      type: "hotel",
      title: "Hotel Radisson Blu",
      date: "2024-01-25",
      location: "Ranchi",
      guests: 2,
      amount: 8500,
      status: "pending",
      paymentStatus: "pending",
      createdAt: "2024-01-14",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-green-500 text-green-500"
      case "pending":
        return "border-yellow-500 text-yellow-500"
      case "cancelled":
        return "border-red-500 text-red-500"
      default:
        return "border-gray-500 text-gray-500"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-400">Manage and track your ProRaahi bookings</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{booking.title}</h3>
                      <Badge variant="outline" className={getStatusColor(booking.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(booking.status)}
                          <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                        </div>
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{booking.guests} guests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Ref:</span>
                        <span className="font-mono">{booking.reference}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col lg:items-end space-y-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-500">₹{booking.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Payment: {booking.paymentStatus}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {booking.status === "confirmed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="py-16 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
                <p>You haven't made any bookings yet or no bookings match your search.</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <a href="/booking">Make Your First Booking</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
