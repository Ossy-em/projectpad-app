import { ReactNode } from "react";
import Link from "next/link";
import { FaFolder, FaUser, FaCog, FaBrain, FaBook, FaUsers, FaSearch, FaPlus, FaChartBar } from "react-icons/fa";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
    
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
  
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <FaBrain className="text-white text-sm" />
            </div>
            <span className="font-bold text-xl text-slate-800">ResearchFlow</span>
          </div>
        </div>

      
        <div className="p-4 border-b border-gray-200 ">
          <Link 
            href="/dashboard/new-project" 
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors">
          <button className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center justify-center cursor-pointer">
            <FaPlus className="mr-2 text-sm" />
            New Project
          </button>
          </Link>
        </div>


        <nav className="flex-1 p-4">
          <div className="space-y-1">
         
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Workspace
              </h3>
              <div className="space-y-1">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors group"
                >
                  <FaFolder className="text-gray-500 group-hover:text-slate-800" />
                  <span className="font-medium">Projects</span>
                </Link>
                
                <Link 
                  href="/library" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors group"
                >
                  <FaBook className="text-gray-500 group-hover:text-slate-800" />
                  <span className="font-medium">Library</span>
                </Link>
                
                <Link 
                  href="/search" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors group"
                >
                  <FaSearch className="text-gray-500 group-hover:text-slate-800" />
                  <span className="font-medium">Search Papers</span>
                </Link>
                
                <Link 
                  href="/analytics" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors group"
                >
                  <FaChartBar className="text-gray-500 group-hover:text-slate-800" />
                  <span className="font-medium">Analytics</span>
                </Link>
              </div>
            </div>

        
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Collaboration
              </h3>
              <div className="space-y-1">
                <Link 
                  href="/teams" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors group"
                >
                  <FaUsers className="text-gray-500 group-hover:text-slate-800" />
                  <span className="font-medium">Teams</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>


        <div className="p-4 border-t border-gray-200">
          <div className="space-y-1">
            <Link 
              href="/profile" 
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors group"
            >
              <FaUser className="text-gray-500 group-hover:text-slate-800" />
              <span className="font-medium">Profile</span>
            </Link>
            
            <Link 
              href="/settings" 
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-slate-800 transition-colors group"
            >
              <FaCog className="text-gray-500 group-hover:text-slate-800" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>

      
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@university.edu</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}