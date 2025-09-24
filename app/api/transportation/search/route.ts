import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Forward request to Flask backend
    const flaskResponse = await fetch("http://localhost:5000/api/transportation/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!flaskResponse.ok) {
      throw new Error("Flask backend error")
    }

    const data = await flaskResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Transportation search API error:", error)
    return NextResponse.json({ error: "Failed to search transportation" }, { status: 500 })
  }
}
