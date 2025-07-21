"use client";

import React, { useState, useEffect } from 'react';
import { FaBrain, FaBook, FaUsers, FaArrowRight, FaRocket, FaStar } from 'react-icons/fa';


const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FaBrain className="text-white text-sm" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ResearchFlow
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </nav>
);

// Animated Background
const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
     
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          top: '10%',
          left: '70%'
        }}
      />
      <div 
        className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          top: '60%',
          left: '10%',
          animationDelay: '1s'
        }}
      />
      
  
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/40 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Feature Card
const FeatureCard = ({ iconType, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 200);
    return () => clearTimeout(timer);
  }, [delay]);

  const getIcon = () => {
    switch (iconType) {
      case 'brain':
        return <FaBrain className="text-white text-2xl" />;
      case 'book':
        return <FaBook className="text-white text-2xl" />;
      case 'users':
        return <FaUsers className="text-white text-2xl" />;
      default:
        return <FaBrain className="text-white text-2xl" />;
    }
  };

  const getBackgroundIcon = () => {
    switch (iconType) {
      case 'brain':
        return <FaBrain className="text-blue-600 text-lg opacity-30" />;
      case 'book':
        return <FaBook className="text-blue-600 text-lg opacity-30" />;
      case 'users':
        return <FaUsers className="text-blue-600 text-lg opacity-30" />;
      default:
        return <FaBrain className="text-blue-600 text-lg opacity-30" />;
    }
  };

  return (
    <div 
      className={`group relative p-8 rounded-2xl border border-gray-200/50 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
   
      <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center transform transition-transform duration-500 ${
        isHovered ? 'scale-110 rotate-12' : 'scale-100'
      }`}>
        {getBackgroundIcon()}
      </div>
      
     
      <div className={`relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 ${
        isHovered ? 'scale-110 rotate-3' : 'scale-100'
      }`}>
        {getIcon()}
      </div>
      
   
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">{description}</p>
        
     
        <div className={`flex items-center text-blue-600 font-semibold transform transition-all duration-300 ${
          isHovered ? 'translate-x-2' : 'translate-x-0'
        }`}>
          <span>Learn more</span>
          <FaArrowRight className={`ml-2 transform transition-transform duration-300 ${
            isHovered ? 'translate-x-1' : 'translate-x-0'
          }`} />
        </div>
      </div>
      
    
      <div className={`absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
    </div>
  );
};


const StatCounter = ({ end, label, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};


const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <FaBrain className="text-white text-sm" />
        </div>
        <span className="font-bold text-xl">ResearchFlow</span>
      </div>
      <p className="text-gray-400">© 2025 ResearchFlow. All rights reserved.</p>
    </div>
  </footer>
);

// Main Landing Page Component
export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div className={`relative z-10 max-w-5xl mx-auto px-4 text-center transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-bounce">
            <FaRocket className="text-xs" />
            <span>Trusted by 10,000+ researchers</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Supercharge Your
            </span>
            <br />
            <span className="text-gray-900">Research Workflow</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            From literature reviews to references, organize everything in one place. 
            <span className="text-blue-600 font-semibold"> AI-powered insights</span> meet 
            <span className="text-purple-600 font-semibold"> seamless collaboration</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center">
                Get Started Free
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              Watch Demo
            </button>
          </div>
          
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatCounter end={50000} label="Papers Analyzed" suffix="+" />
            <StatCounter end={99} label="Accuracy Rate" suffix="%" />
            <StatCounter end={24} label="Hours Saved Weekly" />
          </div>
        </div>
        
     
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
      
     
      <section id="features" className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Built for Researchers
              </span>
              <br />
              <span className="text-gray-900">& Final-Year Students</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to streamline your research process, backed by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              iconType="brain"
              title="Smart Summarization"
              description="Upload research papers and get clean, concise summaries powered by advanced AI. Save hours of reading time."
              delay={0}
            />
            <FeatureCard
              iconType="book"
              title="Organized References"
              description="Store and manage all your references in one easy-to-use platform. Never lose track of important sources again."
              delay={1}
            />
            <FeatureCard
              iconType="users"
              title="Collaborative Workspaces"
              description="Work together with your team on projects, share notes, and track progress in real-time collaboration."
              delay={2}
            />
          </div>
        </div>
      </section>
      
   
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-2xl mx-1 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-light mb-8 italic">
            "ResearchFlow transformed how I approach my PhD research. What used to take weeks now takes days."
          </blockquote>
          <cite className="text-xl opacity-90">
            - Dr. Amarachi Emeruwa, Manchester University
          </cite>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}