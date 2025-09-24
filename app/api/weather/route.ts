import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city") || "Ranchi"

  try {
    // Mock weather data for Jharkhand cities
    const weatherData = {
      Ranchi: {
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        forecast: [
          { day: "Today", high: 32, low: 22, condition: "Sunny" },
          { day: "Tomorrow", high: 30, low: 20, condition: "Cloudy" },
          { day: "Day 3", high: 29, low: 21, condition: "Light Rain" },
        ],
      },
      Jamshedpur: {
        temperature: 31,
        condition: "Sunny",
        humidity: 58,
        windSpeed: 8,
        forecast: [
          { day: "Today", high: 35, low: 24, condition: "Hot" },
          { day: "Tomorrow", high: 33, low: 23, condition: "Sunny" },
          { day: "Day 3", high: 32, low: 22, condition: "Partly Cloudy" },
        ],
      },
      Dhanbad: {
        temperature: 29,
        condition: "Cloudy",
        humidity: 72,
        windSpeed: 15,
        forecast: [
          { day: "Today", high: 31, low: 21, condition: "Overcast" },
          { day: "Tomorrow", high: 28, low: 19, condition: "Rain" },
          { day: "Day 3", high: 27, low: 18, condition: "Heavy Rain" },
        ],
      },
    }

    const data = weatherData[city as keyof typeof weatherData] || weatherData["Ranchi"]

    return NextResponse.json({
      success: true,
      data: {
        city,
        current: {
          temperature: data.temperature,
          condition: data.condition,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
        },
        forecast: data.forecast,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch weather data" }, { status: 500 })
  }
}
