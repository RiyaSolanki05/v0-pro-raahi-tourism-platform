import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { OverviewSection } from "@/components/dashboard/OverviewSection";
import { HotspotsSection } from "@/components/dashboard/HotspotsSection";
import { FeedbackSection } from "@/components/dashboard/FeedbackSection";
import { RestorationSection } from "@/components/dashboard/RestorationSection";
import { MaintenanceSection } from "@/components/dashboard/MaintenanceSection";

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "hotspots":
        return <HotspotsSection />;
      case "feedback":
        return <FeedbackSection />;
      case "restoration":
        return <RestorationSection />;
      case "maintenance":
        return <MaintenanceSection />;
      case "analytics":
        return <OverviewSection />; // For now, same as overview
      default:
        return <OverviewSection />;
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default Dashboard;
