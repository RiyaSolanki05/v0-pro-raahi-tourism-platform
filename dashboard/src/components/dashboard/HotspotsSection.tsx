import React from "react";
import { TrendingUp, MapPin, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hotSpots } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const HotspotsSection: React.FC = () => {
  const chartData = hotSpots.map(spot => ({
    name: spot.name.split(' ').slice(0, 2).join(' '),
    visitors: spot.visitors,
    rating: spot.rating
  }));

  const getCategoryColor = (category: string) => {
    const colors = {
      Natural: "bg-dashboard-success text-white",
      Religious: "bg-dashboard-primary text-white", 
      Wildlife: "bg-dashboard-secondary text-white",
      Historical: "bg-dashboard-warning text-white"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Hottest Tourist Spots</h2>
        <p className="text-muted-foreground">Most visited destinations and their performance metrics</p>
      </div>

      {/* Chart */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-dashboard-primary" />
            Visitor Numbers by Top Destinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="visitors" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hotspots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotSpots.map((spot) => (
          <Card key={spot.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{spot.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {spot.location}
                    </p>
                  </div>
                  <Badge className={getCategoryColor(spot.category)}>
                    {spot.category}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-dashboard-primary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{spot.visitors.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Visitors</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Star className="h-5 w-5 text-dashboard-warning mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{spot.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-dashboard-success mx-auto mb-1" />
                    <p className="text-lg font-bold text-dashboard-success">{spot.growth}</p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
