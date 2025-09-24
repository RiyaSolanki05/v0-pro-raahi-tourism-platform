import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || ""
    const specialty = searchParams.get("specialty") || ""

    // Forward request to Flask backend
    const flaskResponse = await fetch(`http://localhost:5000/api/guides?location=${location}&specialty=${specialty}`)

    if (!flaskResponse.ok) {
      throw new Error("Flask backend error")
    }

    const data = await flaskResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Guides API error:", error)
    return NextResponse.json({ error: "Failed to fetch guides" }, { status: 500 })
  }
}
