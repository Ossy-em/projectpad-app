'use client';
import AppLayout from '@/components/layouts/AppLayout';
import React, { useState } from 'react';
import { FaFile, FaStickyNote, FaQuoteLeft, FaUsers, FaArrowLeft, FaEllipsisV } from 'react-icons/fa';

type TabType = 'documents' | 'notes' | 'citations' | 'collaborate';

interface Project {
  id: string;
  title: string;
  type: string;
  description?: string;
  lastModified: string;
}


const mockProject: Project = {
  id: '1',
  title: 'Machine Learning in Healthcare: A Systematic Review',
  type: 'Thesis',
  description: 'Analyzing the application of ML algorithms in medical diagnosis and treatment prediction',
  lastModified: '2 hours ago'
};

export default function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState<TabType>('documents');

  const tabs = [
    { id: 'documents', label: 'Documents', icon: FaFile },
    { id: 'notes', label: 'Notes', icon: FaStickyNote },
    { id: 'citations', label: 'Citations', icon: FaQuoteLeft },
    { id: 'collaborate', label: 'Collaborate', icon: FaUsers },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'documents':
        return (
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <FaFile className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
              <p className="text-gray-500 mb-4">Upload your research papers, PDFs, and documents to get started</p>
              <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
                Upload Documents
              </button>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <FaStickyNote className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-500 mb-4">Start taking notes to organize your thoughts and ideas</p>
              <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
                Create Note
              </button>
            </div>
          </div>
        );
      case 'citations':
        return (
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <FaQuoteLeft className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No citations yet</h3>
              <p className="text-gray-500 mb-4">Add citations to build your bibliography</p>
              <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
                Add Citation
              </button>
            </div>
          </div>
        );
      case 'collaborate':
        return (
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <FaUsers className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Working alone</h3>
              <p className="text-gray-500 mb-4">Invite collaborators to work together on this project</p>
              <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
                Invite Collaborators
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout>
    <div className="min-h-screen bg-gray-50">
      
   
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-slate-800">{mockProject.title}</h1>
                <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                  <span>{mockProject.type}</span>
                  <span>•</span>
                  <span>Last modified {mockProject.lastModified}</span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaEllipsisV className="text-gray-600" />
            </button>
          </div>
        </div>

  
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-slate-800 text-slate-800'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

    
      <div className="flex-1">
        {renderTabContent()}
      </div>
    </div>
    </AppLayout>
  );
}