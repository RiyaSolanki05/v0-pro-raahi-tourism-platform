import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const mode = searchParams.get("mode") || "driving"

  try {
    // Mock route data for Jharkhand destinations
    const routeData = {
      distance: "45.2 km",
      duration: "1h 15m",
      route: [
        { lat: 23.3441, lng: 85.3096, name: "Ranchi" },
        { lat: 23.4559, lng: 85.2401, name: "Kanke Dam" },
        { lat: 23.5204, lng: 85.1685, name: "Hundru Falls" },
      ],
      instructions: [
        "Head north on Main Road",
        "Turn right onto NH-33",
        "Continue for 35 km",
        "Turn left at Hundru Falls sign",
        "Arrive at destination",
      ],
      traffic: "Light",
      tolls: "₹45",
      fuelCost: "₹320",
    }

    return NextResponse.json({
      success: true,
      data: {
        from,
        to,
        mode,
        ...routeData,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch route data" }, { status: 500 })
  }
}
