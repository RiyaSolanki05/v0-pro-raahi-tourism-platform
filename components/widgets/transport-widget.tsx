"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, Train, Plane, Clock, Users, MapPin } from "lucide-react"

interface TransportData {
  id: string
  route: string
  currentLocation: string
  nextStop: string
  eta: string
  delay?: string
  occupancy?: string
  platform?: string
  gate?: string
  terminal?: string
  status?: string
  departure?: string
}

interface TransportWidgetProps {
  type?: "buses" | "trains" | "flights"
}

export function TransportWidget({ type = "buses" }: TransportWidgetProps) {
  const [transport, setTransport] = useState<TransportData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const response = await fetch(`/api/transport/live?type=${type}`)
        const result = await response.json()
        if (result.success) {
          setTransport(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch transport data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransport()
    const interval = setInterval(fetchTransport, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [type])

  const getTransportIcon = () => {
    switch (type) {
      case "trains":
        return <Train className="h-5 w-5 text-blue-400" />
      case "flights":
        return <Plane className="h-5 w-5 text-green-400" />
      default:
        return <Bus className="h-5 w-5 text-yellow-400" />
    }
  }

  const getDelayColor = (delay: string) => {
    if (delay === "On time") return "text-green-400"
    if (delay.includes("5 mins")) return "text-yellow-400"
    return "text-red-400"
  }

  if (loading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          {getTransportIcon()}
          <span>Live {type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {transport.slice(0, 2).map((item, index) => (
            <div key={index} className="border-b border-gray-800 pb-3 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{item.id || item.route}</span>
                {item.delay && <span className={`text-xs ${getDelayColor(item.delay)}`}>{item.delay}</span>}
              </div>

              <p className="text-xs text-gray-400 mb-2">{item.route}</p>

              <div className="space-y-1">
                {item.currentLocation && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-300">Currently at: {item.currentLocation}</span>
                  </div>
                )}

                {item.nextStop && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-300">
                      Next: {item.nextStop} ({item.eta})
                    </span>
                  </div>
                )}

                {item.occupancy && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-300">Occupancy: {item.occupancy}</span>
                  </div>
                )}

                {item.platform && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-300">Platform: {item.platform}</span>
                  </div>
                )}

                {item.gate && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-300">
                      Gate: {item.gate} | Terminal: {item.terminal}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
