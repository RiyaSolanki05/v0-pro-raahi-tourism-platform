import React from "react";
import { BarChart3, MapPin, MessageSquare, Wrench, TrendingUp, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import dashboardHero from "@/assets/dashboard-hero.jpg";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "hotspots", label: "Hottest Spots", icon: TrendingUp },
  { id: "feedback", label: "Feedback Analysis", icon: MessageSquare },
  { id: "restoration", label: "Restoration Projects", icon: Wrench },
  { id: "maintenance", label: "Maintenance Needed", icon: MapPin },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeSection = "overview",
  onSectionChange
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-gradient-card shadow-elevated">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Jharkhand Tourism
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Analytics Dashboard</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange?.(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200",
                      "hover:bg-dashboard-primary/10 hover:shadow-sm",
                      activeSection === item.id
                        ? "bg-gradient-primary text-primary-foreground shadow-card"
                        : "text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Banner */}
          <div 
            className="relative h-48 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${dashboardHero})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dashboard-primary/80 to-dashboard-secondary/80 flex items-center">
              <div className="px-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Jharkhand Tourism Analytics
                </h1>
                <p className="text-white/90 text-lg">
                  Comprehensive insights for heritage site management and tourist experience optimization
                </p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
