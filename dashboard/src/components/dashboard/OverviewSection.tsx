import React from "react";
import { Users, TrendingUp, MapPin, Star, DollarSign, Building } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { tourismMetrics, visitorTrends, categoryBreakdown } from "@/data/mockData";

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const OverviewSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Tourism Overview</h2>
        <p className="text-muted-foreground">Monitor key tourism metrics and trends across Jharkhand</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Annual Visitors"
          value={tourismMetrics.totalVisitors}
          change={tourismMetrics.monthlyGrowth}
          changeType="positive"
          icon={Users}
          description="vs last year"
        />
        <MetricCard
          title="Active Monuments"
          value={tourismMetrics.activeMonuments}
          icon={Building}
          description="Heritage sites monitored"
        />
        <MetricCard
          title="Average Rating"
          value={tourismMetrics.avgRating}
          icon={Star}
          description="Tourist satisfaction"
        />
        <MetricCard
          title="Revenue Generated"
          value={tourismMetrics.revenueGenerated}
          change={tourismMetrics.revenueGrowth}
          changeType="positive"
          icon={DollarSign}
          description="Tourism revenue this year"
        />
        <MetricCard
          title="Growth Rate"
          value="12.5%"
          changeType="positive"
          icon={TrendingUp}
          description="Year-over-year growth"
        />
        <MetricCard
          title="Popular Destinations"
          value="45"
          icon={MapPin}
          description="Top-rated locations"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Visitor Trends (Last 7 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Visitor Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
