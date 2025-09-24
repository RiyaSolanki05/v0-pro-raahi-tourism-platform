"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Phone, CheckCircle } from "lucide-react"

interface SafetyData {
  location: string
  safetyScore: number
  level: string
  alerts: string[]
  recommendations: string[]
  emergencyContacts: Record<string, string>
}

interface SafetyWidgetProps {
  location?: string
}

export function SafetyWidget({ location = "Ranchi" }: SafetyWidgetProps) {
  const [safety, setSafety] = useState<SafetyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSafety = async () => {
      try {
        const response = await fetch(`/api/safety?location=${location}`)
        const result = await response.json()
        if (result.success) {
          setSafety(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch safety data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSafety()
  }, [location])

  const getSafetyColor = (score: number) => {
    if (score >= 8) return "text-green-500"
    if (score >= 6) return "text-yellow-500"
    return "text-red-500"
  }

  if (loading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!safety) return null

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">Safety Status - {safety.location}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Shield className={`h-6 w-6 ${getSafetyColor(safety.safetyScore)}`} />
            <div>
              <p className="text-lg font-bold text-white">{safety.safetyScore}/10</p>
              <p className="text-sm text-gray-400">{safety.level}</p>
            </div>
          </div>
        </div>

        {safety.alerts.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-red-400 uppercase tracking-wide mb-2">Active Alerts</h4>
            {safety.alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">{alert}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Safety Tips</h4>
          {safety.recommendations.slice(0, 2).map((tip, index) => (
            <div key={index} className="flex items-start space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-300">{tip}</span>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Emergency Contacts</h4>
          <div className="space-y-1">
            {Object.entries(safety.emergencyContacts).map(([type, number]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-300 capitalize">{type.replace("_", " ")}</span>
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-white font-mono">{number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
