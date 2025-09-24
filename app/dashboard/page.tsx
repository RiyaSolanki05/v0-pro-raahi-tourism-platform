import { WeatherWidget } from "@/components/widgets/weather-widget"
import { SafetyWidget } from "@/components/widgets/safety-widget"
import { TransportWidget } from "@/components/widgets/transport-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar, MapPin, Star } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to ProRaahi</h1>
          <p className="text-gray-400">Your AI-powered Jharkhand tourism companion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/chat">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-700 hover:border-green-500 bg-transparent"
                    >
                      <MessageCircle className="h-6 w-6" />
                      <span className="text-sm">AI Chat</span>
                    </Button>
                  </Link>
                  <Link href="/plan">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-700 hover:border-green-500 bg-transparent"
                    >
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">Plan Trip</span>
                    </Button>
                  </Link>
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-700 hover:border-green-500 bg-transparent"
                    >
                      <MapPin className="h-6 w-6" />
                      <span className="text-sm">Book Now</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-700 hover:border-green-500 bg-transparent"
                  >
                    <Star className="h-6 w-6" />
                    <span className="text-sm">Favorites</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Trip to Hundru Falls planned</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Guide booked for Betla National Park</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Transportation arranged to Jamshedpur</p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <WeatherWidget city="Ranchi" />
            <SafetyWidget location="Ranchi" />
            <TransportWidget type="buses" />
          </div>
        </div>

        {/* Featured Destinations */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Featured Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent"></div>
                <div className="relative">
                  <h3 className="font-semibold mb-2">Hundru Falls</h3>
                  <p className="text-sm text-gray-400 mb-3">Spectacular 98m waterfall near Ranchi</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black bg-transparent"
                  >
                    Explore
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                <div className="relative">
                  <h3 className="font-semibold mb-2">Betla National Park</h3>
                  <p className="text-sm text-gray-400 mb-3">Wildlife sanctuary with tigers and elephants</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black bg-transparent"
                  >
                    Explore
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                <div className="relative">
                  <h3 className="font-semibold mb-2">Deoghar Temple</h3>
                  <p className="text-sm text-gray-400 mb-3">Sacred Jyotirlinga temple complex</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black bg-transparent"
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
