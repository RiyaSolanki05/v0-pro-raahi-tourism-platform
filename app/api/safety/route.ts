import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location") || "Ranchi"

  try {
    // Mock safety data for Jharkhand regions
    const safetyData = {
      Ranchi: {
        safetyScore: 8.5,
        level: "Safe",
        alerts: [],
        recommendations: [
          "Carry valid ID while traveling",
          "Avoid isolated areas after dark",
          "Keep emergency contacts handy",
        ],
        emergencyContacts: {
          police: "100",
          medical: "108",
          tourist_helpline: "1363",
        },
      },
      Jamshedpur: {
        safetyScore: 9.0,
        level: "Very Safe",
        alerts: [],
        recommendations: [
          "Industrial city with good security",
          "Well-lit roads and public areas",
          "Regular police patrolling",
        ],
        emergencyContacts: {
          police: "100",
          medical: "108",
          tourist_helpline: "1363",
        },
      },
      Hazaribagh: {
        safetyScore: 7.5,
        level: "Moderately Safe",
        alerts: ["Wildlife crossing areas - drive carefully", "Limited mobile connectivity in forest areas"],
        recommendations: [
          "Travel in groups in forest areas",
          "Inform someone about your itinerary",
          "Carry first aid kit for wildlife areas",
        ],
        emergencyContacts: {
          police: "100",
          medical: "108",
          forest_dept: "1926",
        },
      },
    }

    const data = safetyData[location as keyof typeof safetyData] || safetyData["Ranchi"]

    return NextResponse.json({
      success: true,
      data: {
        location,
        ...data,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch safety data" }, { status: 500 })
  }
}
