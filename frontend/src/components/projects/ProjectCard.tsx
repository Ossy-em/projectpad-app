'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Project {
  id: string | number;
  title: string;
  type: string;
  lastWorked: string;
  stats: {
    sources: number;
    wordCount: number;
    chapters: {
      completed: number;
      total: number;
    };
  };
  recentActivity: string;
  nextStep: string;
  isSample?: boolean;
}

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the project workspace
    router.push(`/projects/${project.id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {project.title}
          </h3>
          <div className="flex items-center space-x-2">
            {project.isSample && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                Sample
              </span>
            )}
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {project.type}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500">Last worked {project.lastWorked}</p>
      </div>

      {/* Stats - Accumulated Work */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{project.stats.sources}</div>
            <div className="text-xs text-gray-500">Sources</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">{project.stats.wordCount.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Words</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">
              {project.stats.chapters.completed}/{project.stats.chapters.total}
            </div>
            <div className="text-xs text-gray-500">Chapters</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(project.stats.chapters.completed / project.stats.chapters.total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 italic">"{project.recentActivity}"</p>
      </div>

      {/* Next Step */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{project.nextStep}</span>
        <Button size="sm" className="ml-2" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default ProjectCard;