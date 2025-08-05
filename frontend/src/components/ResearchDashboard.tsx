'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { mockProjects } from './projects/mockProject';
import ProjectCard from '@/components/projects/ProjectCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResearchDashboard() {
  const router = useRouter();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = () => {
      const userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      
      const mockProjectsWithBadge = mockProjects.map(project => ({
        ...project,
        isSample: true
      }));
      
      const combined = [...userProjects, ...mockProjectsWithBadge];
      
      setAllProjects(combined);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const displayedProjects = allProjects.slice(0, 5);
  const hasMoreProjects = allProjects.length > 5;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Your Research</h1>
              <Button onClick={() => router.push('/dashboard/new-project')}>+ New Project</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
  
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Research</h1>
            <Button onClick={() => router.push('/dashboard/new-project')}>+ New Project</Button>
          </div>
        </div>
      </div>

 
      <div className="max-w-7xl mx-auto px-6 py-8">
  
        {displayedProjects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
    
            {hasMoreProjects && (
              <div className="mt-8 text-center">
                <Link 
                  href="/projects" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  See all projects ({allProjects.length})
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}

     
        {displayedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Start your first research project to begin organizing your work</p>
            <Button onClick={() => router.push('/dashboard/new-project')}>Create Your First Project</Button>
          </div>
        )}
      </div>
    </div>
  );
}