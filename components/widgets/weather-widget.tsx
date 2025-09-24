"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Droplets } from "lucide-react"

interface WeatherData {
  city: string
  current: {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
  }>
}

interface WeatherWidgetProps {
  city?: string
}

export function WeatherWidget({ city = "Ranchi" }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?city=${city}`)
        const result = await response.json()
        if (result.success) {
          setWeather(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Sun")) return <Sun className="h-6 w-6 text-yellow-500" />
    if (condition.includes("Rain")) return <CloudRain className="h-6 w-6 text-blue-500" />
    return <Cloud className="h-6 w-6 text-gray-500" />
  }

  if (loading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">Weather in {weather.city}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather.current.condition)}
            <span className="text-2xl font-bold text-white">{weather.current.temperature}°C</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">{weather.current.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">{weather.current.windSpeed} km/h</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">3-Day Forecast</h4>
          {weather.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{day.day}</span>
              <div className="flex items-center space-x-2">
                {getWeatherIcon(day.condition)}
                <span className="text-sm text-white">
                  {day.high}°/{day.low}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
