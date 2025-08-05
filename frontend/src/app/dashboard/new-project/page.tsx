"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const projectTypes = [
  {
    id: "thesis",
    name: "Thesis",
    description: "70+ page research project with literature review"
  },
  {
    id: "capstone", 
    name: "Capstone",
    description: "Final project demonstrating skills and knowledge"
  },
  {
    id: "essay",
    name: "Essay", 
    description: "Short-form academic writing with citations"
  },
  {
    id: "market-research",
    name: "Market Research",
    description: "Business/industry analysis and insights"
  },
  {
    id: "self-research",
    name: "Self Research", 
    description: "Personal learning and exploration project"
  },
  {
    id: "other",
    name: "Other",
    description: "Custom research project type"
  }
];

const challenges = [
  {
    id: "finding-topic",
    name: "Finding a topic",
    description: "Need help brainstorming or narrowing down research focus"
  },
  {
    id: "organizing-sources",
    name: "Organizing sources", 
    description: "Managing papers, references, and research materials"
  },
  {
    id: "literature-review",
    name: "Writing literature review",
    description: "Synthesizing existing research and identifying gaps"
  },
  {
    id: "managing-citations",
    name: "Managing citations",
    description: "Proper formatting and citation management"
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description: "Working with supervisors, peers, or team members"
  },
  {
    id: "other-challenge",
    name: "Other",
    description: "Different challenge not listed above"
  }
];

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [challenge, setChallenge] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {

    const projectData = { 
      id: `user_${Date.now()}`, // Simple unique ID for now
      title, 
      description, 
      type, 
      challenge,
      createdAt: new Date().toISOString(),
      lastWorked: "just now",
      stats: {
        sources: 0,
        wordCount: 0,
        chapters: { completed: 0, total: 1 }
      },
      recentActivity: "Project created",
      nextStep: getNextStepForChallenge(challenge)
    };

  
    const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    

    const updatedProjects = [projectData, ...existingProjects];
    

    localStorage.setItem('userProjects', JSON.stringify(updatedProjects));
    
    console.log("Project created and saved:", projectData);

    router.push('/dashboard');
  };

  // Helper function to set appropriate next step based on challenge
  const getNextStepForChallenge = (challenge) => {
    switch(challenge) {
      case 'finding-topic':
        return 'Start topic brainstorming';
      case 'organizing-sources':
        return 'Upload your first document';
      case 'literature-review':
        return 'Begin literature review';
      case 'managing-citations':
        return 'Set up citation format';
      case 'collaboration':
        return 'Invite collaborators';
      default:
        return 'Start your research';
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">New Project</h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {step} of 2
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-2">What type of project is this?</h2>
              <p className="text-gray-600 mb-8">Choose the option that best describes your research project.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {projectTypes.map((projectType) => (
                  <button
                    key={projectType.id}
                    className={`p-6 text-left border rounded-lg transition-all hover:border-blue-300 ${
                      type === projectType.id 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200"
                    }`}
                    onClick={() => setType(projectType.id)}
                  >
                    <div className="font-medium text-gray-900 mb-2">
                      {projectType.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {projectType.description}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={!type}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-2">Project Details</h2>
                <p className="text-gray-600">Tell us about your project and what you need help with.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Project Title *
                  </label>
                  <Input 
                    placeholder="e.g., AI Ethics in Healthcare Systems" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Description (optional)
                  </label>
                  <Textarea 
                    placeholder="Brief overview of your research focus, objectives, or scope..."
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What's your biggest challenge right now?
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {challenges.map((challengeOption) => (
                      <button
                        key={challengeOption.id}
                        className={`p-4 text-left border rounded-lg transition-all hover:border-blue-300 ${
                          challenge === challengeOption.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-gray-200"
                        }`}
                        onClick={() => setChallenge(challengeOption.id)}
                      >
                        <div className="font-medium text-gray-900 mb-1">
                          {challengeOption.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {challengeOption.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={!title.trim()}>
                  Create Project
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}