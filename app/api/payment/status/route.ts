import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const transactionId = searchParams.get("transactionId")
  const bookingReference = searchParams.get("bookingReference")

  try {
    // Mock payment status data
    const statusData = {
      transactionId,
      bookingReference,
      status: "completed",
      amount: 3500,
      paymentMethod: "card",
      timestamp: new Date().toISOString(),
      customerDetails: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
      },
      bookingDetails: {
        type: "activity",
        title: "Hundru Falls Adventure Tour",
        date: "2024-01-15",
        location: "Hundru Falls, Ranchi",
        guests: 2,
      },
    }

    return NextResponse.json({
      success: true,
      data: statusData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch payment status" }, { status: 500 })
  }
}
