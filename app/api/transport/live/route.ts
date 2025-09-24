import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const route = searchParams.get("route")
  const type = searchParams.get("type") || "bus"

  try {
    // Mock live transport data
    const liveData = {
      buses: [
        {
          id: "JH01-2345",
          route: "Ranchi - Jamshedpur",
          currentLocation: "Mango",
          nextStop: "Adityapur",
          eta: "15 mins",
          delay: "5 mins",
          occupancy: "75%",
        },
        {
          id: "JH02-6789",
          route: "Ranchi - Dhanbad",
          currentLocation: "Ramgarh",
          nextStop: "Bokaro",
          eta: "25 mins",
          delay: "On time",
          occupancy: "60%",
        },
      ],
      trains: [
        {
          id: "18622",
          name: "Patliputra Express",
          route: "Ranchi - Delhi",
          currentLocation: "Muri",
          nextStop: "Chandil",
          eta: "12 mins",
          delay: "10 mins",
          platform: "2",
        },
      ],
      flights: [
        {
          id: "6E-7891",
          route: "Ranchi - Delhi",
          status: "On Time",
          departure: "14:30",
          gate: "A2",
          terminal: "1",
        },
      ],
    }

    return NextResponse.json({
      success: true,
      data: liveData[type as keyof typeof liveData] || liveData.buses,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch live transport data" }, { status: 500 })
  }
}
