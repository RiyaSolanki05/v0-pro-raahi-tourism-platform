import React from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Meh, TrendingUp, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { feedbackData } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SENTIMENT_COLORS = ['#10b981', '#64748b', '#ef4444'];

export const FeedbackSection: React.FC = () => {
  const sentimentData = [
    { name: 'Positive', value: feedbackData.overall.positive, color: '#10b981' },
    { name: 'Neutral', value: feedbackData.overall.neutral, color: '#64748b' },
    { name: 'Negative', value: feedbackData.overall.negative, color: '#ef4444' }
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return <ThumbsUp className="h-4 w-4 text-dashboard-success" />;
      case 'negative': return <ThumbsDown className="h-4 w-4 text-dashboard-danger" />;
      default: return <Meh className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    const styles = {
      positive: "bg-dashboard-success text-white",
      negative: "bg-dashboard-danger text-white", 
      neutral: "bg-muted text-muted-foreground"
    };
    return styles[sentiment as keyof typeof styles] || styles.neutral;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Feedback Analysis</h2>
        <p className="text-muted-foreground">Tourist sentiment analysis and service quality metrics</p>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-dashboard-primary" />
              Overall Sentiment Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Service Category Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={feedbackData.categories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
                <YAxis domain={[0, 5]} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Service Categories Detail */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Service Quality Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedbackData.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {category.score}/5.0
                    </span>
                    <Badge className="bg-dashboard-success text-white text-xs">
                      {category.trend}
                    </Badge>
                  </div>
                </div>
                <Progress value={(category.score / 5) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackData.recentReviews.map((review) => (
              <div key={review.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{review.location}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-dashboard-warning text-dashboard-warning" />
                      <span className="text-sm text-muted-foreground">{review.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSentimentBadge(review.sentiment)}>
                      {review.sentiment}
                    </Badge>
                    {getSentimentIcon(review.sentiment)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
