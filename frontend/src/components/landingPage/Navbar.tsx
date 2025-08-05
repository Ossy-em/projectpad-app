'use client';
import {FaBrain} from 'react-icons/fa';

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (

      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <FaBrain className="text-white text-sm" />
              </div>
              <span className="font-bold text-xl text-slate-800">
                ResearchFlow
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-slate-800 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-slate-800 transition-colors font-medium">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-slate-800 transition-colors font-medium">About</a>
              <button className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition-all duration-200">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
    );

}
