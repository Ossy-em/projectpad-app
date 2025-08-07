"use client";
import StatCounter from "@/components/landingPage/StatCounter";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/landingPage/Footer";
import FeatureCard from "@/components/landingPage/FeatureCard";
import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaRocket, FaStar } from 'react-icons/fa';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>

            <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <FaRocket className="text-xs" />
              <span>Trusted by 10,000+ researchers worldwide</span>
            </div>


            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-slate-900 max-w-4xl mx-auto">
              Streamline Your Research Workflow
            </h1>


            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              From literature reviews to reference management, organize everything in one professional platform.
              Built for researchers who value efficiency and collaboration.
            </p>


            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
              <button className="bg-slate-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-slate-900 transition-all duration-200 flex items-center">
                Get Started Free
                <FaArrowRight className="ml-2" />
              </button>

              <button className="text-slate-800 px-8 py-4 rounded-lg text-lg font-medium border border-slate-300 hover:border-slate-800 transition-all duration-200">
                Watch Demo
              </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <StatCounter end={50000} label="Papers Analyzed" suffix="+" />
              <StatCounter end={99} label="Accuracy Rate" suffix="%" />
              <StatCounter end={24} label="Hours Saved Weekly" />
            </div>
          </div>
        </div>
      </section>


      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">
              Built for Modern Research
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional tools designed to enhance productivity and collaboration in academic research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              iconType="brain"
              title="Intelligent Summarization"
              description="Upload research papers and receive comprehensive summaries. Extract key insights and save valuable reading time with advanced document analysis."
              delay={0}
            />
            <FeatureCard
              iconType="book"
              title="Reference Management"
              description="Organize, categorize, and manage all your references in one centralized location. Never lose track of important sources again."
              delay={1}
            />
            <FeatureCard
              iconType="users"
              title="Team Collaboration"
              description="Share projects, collaborate on research, and track progress with your team members in real-time collaborative workspaces."
              delay={2}
            />
          </div>
        </div>
      </section>


      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <FaStar className="text-yellow-400 text-xl mx-1" />
            <FaStar className="text-yellow-400 text-xl mx-1" />
            <FaStar className="text-yellow-400 text-xl mx-1" />
            <FaStar className="text-yellow-400 text-xl mx-1" />
            <FaStar className="text-yellow-400 text-xl mx-1" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
            "ResearchFlow transformed how I approach my PhD research. What used to take weeks now takes days. The reference management alone has saved me countless hours."
          </blockquote>
          <cite className="text-lg text-gray-300">
            Dr. Amarachi Emeruwa, PhD Candidate<br />
            <span className="text-sm">University of Manchester</span>
          </cite>
        </div>
      </section>


      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            Ready to transform your research process?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of researchers who trust ResearchFlow for their academic work.
          </p>
          <button className="bg-slate-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-slate-900 transition-all duration-200 inline-flex items-center">
            Start Your Free Trial
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}