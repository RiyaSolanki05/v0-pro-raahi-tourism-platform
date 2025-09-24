import React from "react";
import { Wrench, Calendar, DollarSign, Building, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { restorationProjects } from "@/data/mockData";

export const RestorationSection: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-dashboard-success" />;
      case 'In Progress': return <Clock className="h-4 w-4 text-dashboard-warning" />;
      case 'Planning': return <AlertCircle className="h-4 w-4 text-dashboard-secondary" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Completed': "bg-dashboard-success text-white",
      'In Progress': "bg-dashboard-warning text-white",
      'Planning': "bg-dashboard-secondary text-white"
    };
    return styles[status as keyof typeof styles] || "bg-muted text-muted-foreground";
  };

  const getProgressValue = (status: string, startDate: string, completionDate: string) => {
    if (status === 'Completed') return 100;
    if (status === 'Planning') return 10;
    
    const start = new Date(startDate).getTime();
    const end = new Date(completionDate).getTime();
    const now = new Date().getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  const completedProjects = restorationProjects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = restorationProjects.filter(p => p.status === 'In Progress').length;
  const totalBudget = restorationProjects.reduce((sum, p) => {
    const budget = parseFloat(p.budget.replace('₹', '').replace('M', '').replace('K', ''));
    const multiplier = p.budget.includes('M') ? 1000000 : 1000;
    return sum + (budget * multiplier);
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Restoration Projects</h2>
        <p className="text-muted-foreground">Track heritage site restoration and enhancement projects</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold text-foreground">{restorationProjects.length}</p>
              </div>
              <Building className="h-8 w-8 text-dashboard-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-dashboard-success">{completedProjects}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-dashboard-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-dashboard-warning">{inProgressProjects}</p>
              </div>
              <Clock className="h-8 w-8 text-dashboard-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold text-foreground">₹{(totalBudget / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-dashboard-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {restorationProjects.map((project) => (
          <Card key={project.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-dashboard-primary" />
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{project.location}</p>
                </div>
                <Badge className={getStatusBadge(project.status)}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{project.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                {project.status !== 'Planning' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{getProgressValue(project.status, project.startDate, project.completionDate)}%</span>
                    </div>
                    <Progress value={getProgressValue(project.status, project.startDate, project.completionDate)} className="h-2" />
                  </div>
                )}

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Start:</span>
                    <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Target:</span>
                    <span className="font-medium">{new Date(project.completionDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">{project.budget}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Contractor: </span>
                  <span className="font-medium">{project.contractor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
