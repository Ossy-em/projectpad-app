"use client"
import { useState } from "react";
import NewProjectWizard from "@/components/NewProjectWizard";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layouts/AppLayout";

export default function DashboardPage() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <AppLayout>
       <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <Button onClick={() => setWizardOpen(true)}>+ New Project</Button>
      </div>

      {/* Your project cards/list here */}

      <NewProjectWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
    </AppLayout>
   
  );
}
