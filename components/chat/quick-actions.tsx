"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Mountain, Palette, Users, Compass } from "lucide-react"

interface QuickActionsProps {
  onAction: (action: string) => void
  disabled?: boolean
}

const quickActions = [
  {
    icon: MapPin,
    label: "Tourist Places",
    action: "Show me tourist places in Jharkhand",
    color: "text-terracotta-600 hover:text-terracotta-700",
  },
  {
    icon: Calendar,
    label: "Plan Itinerary",
    action: "Plan a 3 day nature trip",
    color: "text-forest-600 hover:text-forest-700",
  },
  {
    icon: Palette,
    label: "Cultural Sites",
    action: "Tell me about cultural sites",
    color: "text-golden-600 hover:text-golden-700",
  },
  {
    icon: Mountain,
    label: "Eco Tourism",
    action: "Help me with eco-tourism",
    color: "text-forest-600 hover:text-forest-700",
  },
  {
    icon: Users,
    label: "Local Guides",
    action: "I need a certified local guide for cultural tours",
    color: "text-terracotta-600 hover:text-terracotta-700",
  },
  {
    icon: Compass,
    label: "Adventure Tours",
    action: "Plan an adventure trip with trekking and nature exploration",
    color: "text-golden-600 hover:text-golden-700",
  },
]

export function QuickActions({ onAction, disabled }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {quickActions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onAction(action.action)}
          disabled={disabled}
          className={`flex items-center space-x-2 text-xs h-auto py-3 px-3 bg-white/80 backdrop-blur-sm border-warm-200 hover:bg-warm-50 hover:border-warm-300 transition-all duration-200 ${action.color}`}
        >
          <action.icon className="w-4 h-4" />
          <span className="truncate font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  )
}
