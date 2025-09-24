import React from "react";
import { MapPin, AlertTriangle, Calendar, DollarSign, Wrench, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { maintenanceNeeded } from "@/data/mockData";

export const MaintenanceSection: React.FC = () => {
  const getPriorityBadge = (priority: string) => {
    const styles = {
      'High': "bg-dashboard-danger text-white",
      'Medium': "bg-dashboard-warning text-white",
      'Low': "bg-dashboard-secondary text-white"
    };
    return styles[priority as keyof typeof styles] || "bg-muted text-muted-foreground";
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'High': return <AlertTriangle className="h-4 w-4 text-dashboard-danger" />;
      case 'Medium': return <AlertCircle className="h-4 w-4 text-dashboard-warning" />;
      case 'Low': return <AlertCircle className="h-4 w-4 text-dashboard-secondary" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Structural': return <Wrench className="h-4 w-4 text-dashboard-danger" />;
      case 'Conservation': return <MapPin className="h-4 w-4 text-dashboard-warning" />;
      case 'Safety': return <AlertTriangle className="h-4 w-4 text-dashboard-secondary" />;
      default: return <Wrench className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const highPriorityCount = maintenanceNeeded.filter(item => item.priority === 'High').length;
  const totalEstimatedCost = maintenanceNeeded.reduce((sum, item) => {
    const cost = parseFloat(item.estimatedCost.replace('₹', '').replace('K', '').replace('M', ''));
    const multiplier = item.estimatedCost.includes('M') ? 1000000 : 1000;
    return sum + (cost * multiplier);
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Maintenance Required</h2>
        <p className="text-muted-foreground">Monuments and sites requiring immediate attention</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                <p className="text-3xl font-bold text-foreground">{maintenanceNeeded.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-dashboard-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-3xl font-bold text-dashboard-danger">{highPriorityCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-dashboard-danger" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Est. Total Cost</p>
                <p className="text-3xl font-bold text-foreground">₹{(totalEstimatedCost / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-dashboard-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Days Open</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <Calendar className="h-8 w-8 text-dashboard-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Issues List */}
      <div className="space-y-6">
        {maintenanceNeeded.map((item) => (
          <Card key={item.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-dashboard-primary" />
                    {item.monument}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{item.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityBadge(item.priority)}>
                    {getPriorityIcon(item.priority)}
                    <span className="ml-1">{item.priority} Priority</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Issue Description */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    {getCategoryIcon(item.category)}
                    <div>
                      <p className="font-medium text-foreground">{item.issue}</p>
                      <p className="text-sm text-muted-foreground mt-1">Category: {item.category}</p>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="font-medium text-foreground">{item.estimatedCost}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Reported:</span>
                    <span className="font-medium text-foreground">
                      {new Date(item.reportedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Days Since Report */}
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-dashboard-warning" />
                  <span className="text-muted-foreground">
                    {Math.floor((new Date().getTime() - new Date(item.reportedDate).getTime()) / (1000 * 60 * 60 * 24))} days since reported
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
