"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, CheckCircle, Clock, MapPin, Calendar, User, Phone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface BookingDetails {
  type: string
  title: string
  date: string
  location: string
  duration: string
  guests: number
  price: number
  guide?: string
  transportation?: string
  accommodation?: string
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [paymentStep, setPaymentStep] = useState<"details" | "payment" | "processing" | "success">("details")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card")
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    bank: "",
  })

  useEffect(() => {
    // Mock booking details based on URL params
    const type = searchParams.get("type") || "activity"
    const mockBooking: BookingDetails = {
      type: type,
      title:
        type === "guide"
          ? "Local Guide - Ravi Kumar"
          : type === "transport"
            ? "Ranchi to Hundru Falls"
            : type === "hotel"
              ? "Hotel Radisson Blu"
              : "Hundru Falls Adventure Tour",
      date: "2024-01-15",
      location: "Hundru Falls, Ranchi",
      duration: type === "hotel" ? "2 nights" : "6 hours",
      guests: 2,
      price: type === "guide" ? 1500 : type === "transport" ? 2500 : type === "hotel" ? 8500 : 3500,
      guide: type === "activity" ? "Ravi Kumar" : undefined,
      transportation: type === "activity" ? "AC Cab included" : undefined,
      accommodation: type === "hotel" ? "Deluxe Room" : undefined,
    }
    setBookingDetails(mockBooking)
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setPaymentStep("processing")

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep("success")
    }, 3000)
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading booking details...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/booking" className="inline-flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Booking
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white">{bookingDetails.title}</h3>
                  <Badge variant="outline" className="mt-1 border-green-500 text-green-500">
                    {bookingDetails.type.charAt(0).toUpperCase() + bookingDetails.type.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{bookingDetails.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{bookingDetails.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{bookingDetails.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{bookingDetails.guests} guests</span>
                  </div>
                </div>

                {bookingDetails.guide && (
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-400">Guide</p>
                    <p className="text-white">{bookingDetails.guide}</p>
                  </div>
                )}

                {bookingDetails.transportation && (
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-400">Transportation</p>
                    <p className="text-white">{bookingDetails.transportation}</p>
                  </div>
                )}

                {bookingDetails.accommodation && (
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-400">Accommodation</p>
                    <p className="text-white">{bookingDetails.accommodation}</p>
                  </div>
                )}

                <Separator className="bg-gray-700" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-green-500">₹{bookingDetails.price.toLocaleString()}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment protected by SSL</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            {paymentStep === "details" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <Button
                    onClick={() => setPaymentStep("payment")}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {paymentStep === "payment" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <CreditCard className="h-5 w-5 mb-1" />
                      <span className="text-sm">Card</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "upi" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("upi")}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <Phone className="h-5 w-5 mb-1" />
                      <span className="text-sm">UPI</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "netbanking" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("netbanking")}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <Mail className="h-5 w-5 mb-1" />
                      <span className="text-sm">Net Banking</span>
                    </Button>
                  </div>

                  {/* Payment Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          className="bg-gray-800 border-gray-700"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            className="bg-gray-800 border-gray-700"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            className="bg-gray-800 border-gray-700"
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        value={formData.upiId}
                        onChange={(e) => handleInputChange("upiId", e.target.value)}
                        className="bg-gray-800 border-gray-700"
                        placeholder="yourname@paytm"
                      />
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div>
                      <Label htmlFor="bank">Select Bank</Label>
                      <select
                        id="bank"
                        value={formData.bank}
                        onChange={(e) => handleInputChange("bank", e.target.value)}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                      </select>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setPaymentStep("details")} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handlePayment} className="flex-1 bg-green-600 hover:bg-green-700">
                      Pay ₹{bookingDetails.price.toLocaleString()}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentStep === "processing" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="py-16 text-center">
                  <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
                  <p className="text-gray-400">Please wait while we process your payment securely...</p>
                </CardContent>
              </Card>
            )}

            {paymentStep === "success" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="py-16 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Payment Successful!</h3>
                  <p className="text-gray-400 mb-6">
                    Your booking has been confirmed. You will receive a confirmation email shortly.
                  </p>

                  <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
                    <h4 className="font-semibold mb-2">Booking Reference</h4>
                    <p className="text-green-500 font-mono text-lg">PRH-{Date.now().toString().slice(-6)}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/booking">Book Another Trip</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
