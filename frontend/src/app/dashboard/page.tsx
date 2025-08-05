import ResearchDashboard from "@/components/ResearchDashboard";
import AppLayout from "@/components/layouts/AppLayout";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppLayout>
         <ResearchDashboard />
      </AppLayout>
     
    </div>
  );
}