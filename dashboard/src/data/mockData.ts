export const tourismMetrics = {
  totalVisitors: "2,847,392",
  monthlyGrowth: "+12.5%",
  activeMonuments: "156",
  avgRating: "4.7",
  revenueGenerated: "₹45.2M",
  revenueGrowth: "+18.3%"
};

export const hotSpots = [
  {
    id: 1,
    name: "Ranchi Hill",
    visitors: 45823,
    growth: "+23%",
    rating: 4.8,
    category: "Natural",
    location: "Ranchi"
  },
  {
    id: 2,
    name: "Jagannath Temple",
    visitors: 38472,
    growth: "+15%", 
    rating: 4.6,
    category: "Religious",
    location: "Ranchi"
  },
  {
    id: 3,
    name: "Betla National Park",
    visitors: 29384,
    growth: "+31%",
    rating: 4.9,
    category: "Wildlife",
    location: "Palamu"
  },
  {
    id: 4,
    name: "Hundru Falls",
    visitors: 27192,
    growth: "+8%",
    rating: 4.5,
    category: "Natural",
    location: "Ranchi"
  },
  {
    id: 5,
    name: "Dassam Falls",
    visitors: 24816,
    growth: "+19%",
    rating: 4.7,
    category: "Natural", 
    location: "Ranchi"
  }
];

export const feedbackData = {
  overall: {
    positive: 78,
    neutral: 16,
    negative: 6
  },
  categories: [
    { category: "Cleanliness", score: 4.2, trend: "+0.3" },
    { category: "Accessibility", score: 3.8, trend: "+0.1" },
    { category: "Facilities", score: 4.1, trend: "+0.4" },
    { category: "Staff Behavior", score: 4.5, trend: "+0.2" },
    { category: "Safety", score: 4.3, trend: "+0.1" }
  ],
  recentReviews: [
    {
      id: 1,
      location: "Ranchi Hill",
      rating: 5,
      comment: "Absolutely beautiful view and well maintained trails.",
      sentiment: "positive",
      date: "2024-01-15"
    },
    {
      id: 2,
      location: "Betla National Park",
      rating: 4,
      comment: "Great wildlife experience but could use better road connectivity.",
      sentiment: "positive",
      date: "2024-01-14"
    },
    {
      id: 3,
      location: "Hundru Falls",
      rating: 3,
      comment: "Nice place but overcrowded during weekends.",
      sentiment: "neutral",
      date: "2024-01-13"
    }
  ]
};

export const restorationProjects = [
  {
    id: 1,
    name: "Jagannath Temple Restoration",
    location: "Ranchi",
    status: "Completed",
    startDate: "2023-08-15",
    completionDate: "2024-01-10",
    budget: "₹2.5M",
    contractor: "Heritage Works Ltd."
  },
  {
    id: 2,
    name: "Ranchi Hill Trail Enhancement",
    location: "Ranchi",
    status: "In Progress",
    startDate: "2023-12-01",
    completionDate: "2024-03-15",
    budget: "₹1.8M",
    contractor: "Green Infrastructure Co."
  },
  {
    id: 3,
    name: "Betla Visitor Center Upgrade",
    location: "Palamu",
    status: "Planning",
    startDate: "2024-02-01",
    completionDate: "2024-07-30",
    budget: "₹3.2M",
    contractor: "TBD"
  }
];

export const maintenanceNeeded = [
  {
    id: 1,
    monument: "Deogarh Temple Complex",
    location: "Deoghar",
    priority: "High",
    issue: "Structural damage to main entrance",
    estimatedCost: "₹850K",
    reportedDate: "2024-01-10",
    category: "Structural"
  },
  {
    id: 2,
    monument: "Palamau Fort",
    location: "Palamu",
    priority: "Medium",
    issue: "Weathering of stone walls",
    estimatedCost: "₹450K",
    reportedDate: "2024-01-08", 
    category: "Conservation"
  },
  {
    id: 3,
    monument: "Maluti Temples",
    location: "Dumka",
    priority: "High",
    issue: "Water seepage in foundation",
    estimatedCost: "₹1.2M",
    reportedDate: "2024-01-05",
    category: "Structural"
  },
  {
    id: 4,
    monument: "Rajrappa Falls Viewing Area",
    location: "Ramgarh", 
    priority: "Low",
    issue: "Railing maintenance required",
    estimatedCost: "₹120K",
    reportedDate: "2024-01-12",
    category: "Safety"
  }
];

export const visitorTrends = [
  { month: "Jul", visitors: 180000, revenue: 2.8 },
  { month: "Aug", visitors: 220000, revenue: 3.4 },
  { month: "Sep", visitors: 195000, revenue: 3.1 },
  { month: "Oct", visitors: 285000, revenue: 4.2 },
  { month: "Nov", visitors: 315000, revenue: 4.8 },
  { month: "Dec", visitors: 340000, revenue: 5.1 },
  { month: "Jan", visitors: 298000, revenue: 4.5 }
];

export const categoryBreakdown = [
  { name: "Religious Sites", value: 35, visitors: 996590 },
  { name: "Natural Attractions", value: 28, visitors: 797470 },
  { name: "Wildlife Parks", value: 20, visitors: 569478 },
  { name: "Historical Sites", value: 12, visitors: 341687 },
  { name: "Cultural Centers", value: 5, visitors: 142237 }
];
