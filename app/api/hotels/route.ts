import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || ""

    // Forward request to Flask backend
    const flaskResponse = await fetch(`http://localhost:5000/api/hotels?location=${location}`)

    if (!flaskResponse.ok) {
      throw new Error("Flask backend error")
    }

    const data = await flaskResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Hotels API error:", error)
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 })
  }
}
