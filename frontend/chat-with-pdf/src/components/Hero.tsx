import React, { useState, useEffect } from 'react';
import { ChevronRight, FileText, Sparkles, Menu, X, Command, Bot, Download, Search, Share2, MessageSquare } from 'lucide-react';

// Define the animations as a separate stylesheet
const AnimationStyles = () => {
  return (
    <style>
      {`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #00FFFF, #00FF00, #FFFFFF);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 3s linear infinite;
        }
        
        .typing-animation {
          overflow: hidden;
          border-right: 2px solid #00FFFF;
          white-space: nowrap;
          animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
          width: 100%;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #00FFFF }
        }
        
        .matrix-bg {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpath d='M0 0 L50 0 L50 50 L0 50 Z' fill='%2300FF00'/%3E%3Cpath d='M50 0 L100 0 L100 50 L50 50 Z' fill='%2300FFFF'/%3E%3Cpath d='M0 50 L50 50 L50 100 L0 100 Z' fill='%2300FFFF'/%3E%3Cpath d='M50 50 L100 50 L100 100 L50 100 Z' fill='%2300FF00'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .glow {
          filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.3));
        }
        
        .grid-lines {
          background-image: 
            linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        @keyframes rotate3d {
          0% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
          50% { transform: perspective(1000px) rotateY(5deg) rotateX(-2deg); }
          100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
        }
        
        .rotate-3d {
          animation: rotate3d 8s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        .pulse-ring {
          animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, 
            rgba(0, 255, 255, 0), 
            rgba(0, 255, 255, 0.2), 
            rgba(0, 255, 255, 0));
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        @keyframes float-particles {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(30px); opacity: 0; }
        }
        
        .particle {
          position: absolute;
          animation: float-particles 10s infinite linear;
        }
        
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        
        .orb {
          position: absolute;
          animation: orbit 20s linear infinite;
        }
      `}
    </style>
  );
};

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDataProcessing, setIsDataProcessing] = useState(true);
  
  // For blinking dots animation
  const [activeDot, setActiveDot] = useState(0);
  
  useEffect(() => {
    const processingInterval = setInterval(() => {
      setIsDataProcessing(prev => !prev);
    }, 5000);
    
    const dotInterval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % 5);
    }, 500);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(processingInterval);
      clearInterval(dotInterval);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden matrix-bg">
      {/* Include the animation styles */}
      <AnimationStyles />
      
      {/* Animated background elements - replaced bubbles with grid lines */}
      <div className="absolute inset-0 overflow-hidden grid-lines">
        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`line-h-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-10"
            style={{
              height: '1px',
              width: '100%',
              top: `${(i + 1) * 12}%`,
              left: 0,
              transform: `rotate(${Math.random() * 2 - 1}deg)`,
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`line-v-${i}`}
            className="absolute bg-gradient-to-b from-transparent via-teal-500 to-transparent opacity-10"
            style={{
              width: '1px',
              height: '100%',
              left: `${(i + 1) * 20}%`,
              top: 0,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 10 ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg border-b border-teal-500/30' : 'py-6'}`}>
        <div className="container mx-auto px-6 sm:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Command size={24} className="text-teal-400 mr-2" />
            <span className="text-2xl font-bold gradient-text">Askify</span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#faqs" className="hover:text-teal-400 transition-colors">FAQs</a>
            <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
            <a href="/login" className="px-4 py-2 border border-teal-500 rounded-md hover:bg-teal-500/10 transition-all">Login</a>
            <a href="/signup" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md hover:opacity-90 transition-all font-medium">Sign Up</a>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
            {isMenuOpen ? <X size={24} className="text-teal-400" /> : <Menu size={24} className="text-teal-400" />}
          </button>
        </div>

        {/* Mobile navigation */}
        <div className={`md:hidden absolute w-full bg-black/90 backdrop-blur-md transition-all duration-300 border-b border-teal-500/30 ${isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden border-b-0'}`}>
          <div className="container mx-auto px-6 sm:px-8 flex flex-col space-y-4">
            <a href="#features" className="hover:text-teal-400 transition-colors py-2">Features</a>
            <a href="#pricing" className="hover:text-teal-400 transition-colors py-2">Pricing</a>
            <a href="#about" className="hover:text-teal-400 transition-colors py-2">About</a>
            <a href="#login" className="py-2 px-4 border border-teal-500 rounded-md text-center hover:bg-teal-500/10 transition-all">Login</a>
            <a href="#signup" className="py-2 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md text-center hover:opacity-90 transition-all font-medium">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Hero content - improved spacing */}
      <div className="container mx-auto px-6 sm:px-8 pt-36 md:pt-40 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-12">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-20 animate-pulse "></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 pl-7">
                Unlock Your PDF <span className="gradient-text">Documents</span> with AI
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-10 max-w-lg pl-7">
              Transform how you interact with documents. Upload your PDF and ask questions in natural language — 
              get instant, accurate answers powered by cutting-edge AI.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pl-7">
              <a href="#try-now" className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md text-center hover:opacity-90 transition-all flex items-center justify-center font-medium shadow-lg shadow-teal-500/20">
                Try Now <ChevronRight size={20} className="ml-2" />
              </a>
              <a href="#learn-more" className="px-8 py-4 border border-teal-500 rounded-md text-center hover:bg-teal-500/10 transition-all flex items-center justify-center">
                Learn More
              </a>
            </div>
          </div>

          {/* COMPLETELY REDESIGNED ANIMATED ILLUSTRATION */}
          <div className="lg:w-1/2 relative">
            {/* Orbiting elements */}
            {[...Array(3)].map((_, i) => (
              <div 
                key={`orb-${i}`}
                className="orb absolute top-1/2 left-1/2"
                style={{ 
                  animationDelay: `${i * -6}s`,
                  width: '12px',
                  height: '12px',
                }}
              >
                <div className={`
                  w-full h-full rounded-full bg-gradient-to-r 
                  ${i === 0 ? 'from-teal-400 to-cyan-300' : 
                    i === 1 ? 'from-green-400 to-teal-300' :
                    'from-cyan-400 to-blue-300'}
                  glow opacity-70
                `}></div>
              </div>
            ))}
            
            {/* Pulse rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`ring-${i}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal-500/30 pulse-ring"
                  style={{
                    width: '300px',
                    height: '300px',
                    animationDelay: `${i * 1}s`
                  }}
                ></div>
              ))}
            </div>
            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="particle absolute"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  background: `rgba(${Math.random() * 100}, ${Math.random() * 255}, ${Math.random() * 255 + 150}, ${Math.random() * 0.5 + 0.2})`,
                  borderRadius: '50%',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                }}
              ></div>
            ))}
              
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute w-64 h-64 rounded-full bg-teal-900/30 blur-3xl"></div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-cyan-900/20 blur-3xl"></div>
            </div>
            
            {/* Main UI container with 3D rotation effect */}
            <div className="relative rotate-3d" style={{ transformOrigin: 'center center' }}>
              {/* Floating hexagons in the background */}
              {/* {[...Array(6)].map((_, i) => (
                <div
                  key={`hex-${i}`}
                  className="absolute hexagon"
                  style={{
                    width: `${Math.random() * 60 + 30}px`,
                    height: `${Math.random() * 60 + 30}px`,
                    background: `rgba(0, ${Math.random() * 155 + 100}, ${Math.random() * 155 + 100}, 0.15)`,
                    border: '1px solid rgba(0, 255, 255, 0.1)',
                    top: `${Math.random() * 120 - 10}%`,
                    left: `${Math.random() * 120 - 10}%`,
                    animation: `float ${Math.random() * 5 + 10}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`,
                    zIndex: Math.floor(Math.random() * 3) - 1,
                  }}
                ></div>
              ))} */}
              
              {/* Futuristic UI dashboard - completely redesigned */}
              <div className="relative bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-500/30 p-6 max-w-lg mx-auto overflow-hidden transform transition-all duration-500">
                {/* Side navigation */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 p-3 flex flex-col items-center space-y-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center glow">
                    <FileText size={18} className="text-black" />
                  </div>
                  
                  {[Search, MessageSquare, Share2, Download].map((Icon, i) => (
                    <div key={`icon-${i}`} className="w-10 h-10 rounded-full bg-gray-800/70 border border-gray-700 flex items-center justify-center hover:bg-teal-900/50 transition-all cursor-pointer">
                      <Icon size={16} className="text-teal-400" />
                    </div>
                  ))}
                </div>
                
                {/* Main content panel */}
                <div className="ml-16 relative">
                  {/* Status bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-900/30 rounded-lg border border-teal-500/20">
                        <FileText size={18} className="text-teal-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">AI Document Analysis</h3>
                        <div className="flex items-center text-xs text-gray-400">
                          <span className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full ${isDataProcessing ? 'bg-teal-400' : 'bg-gray-500'} mr-1`}></span>
                            {isDataProcessing ? 'Processing' : 'Analysis Complete'}
                          </span>
                          <span className="mx-2">•</span>
                          <span>research-paper.pdf</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={`dot-${i}`} 
                          className={`w-2 h-2 rounded-full ${i === activeDot % 3 ? 'bg-teal-400' : 'bg-gray-600'}`}>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Document visualization panel */}
                  <div className="bg-black/30 rounded-lg border border-teal-500/20 p-4 mb-6 relative overflow-hidden">
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 shimmer pointer-events-none"></div>
                    
                    {/* Visualization header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles size={16} className="text-teal-400" />
                        <span className="font-medium text-sm">Document Insights</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400">
                        <span className="px-2 py-1 rounded-full bg-teal-900/30 border border-teal-500/20">
                          38 pages
                        </span>
                      </div>
                    </div>
                    
                    {/* Interactive visualization */}
                    <div className="relative h-32 mb-4">
                      {/* Document structure visualization */}
                      <div className="absolute inset-0 flex items-end">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={`bar-${i}`}
                            className="flex-1 mx-px bg-gradient-to-t from-teal-500/80 to-cyan-500/30 rounded-t"
                            style={{ 
                              height: `${30 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
                              opacity: i % 4 === 0 ? 0.9 : 0.5
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Highlighted section */}
                      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-16 border-b-2 border-yellow-400 flex justify-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full -mb-1"></div>
                      </div>
                    </div>
                    
                    {/* Key findings */}
                    <div className="bg-black/20 rounded-lg p-3 border border-teal-500/10">
                      <div className="flex items-center mb-2">
                        <Bot size={14} className="text-teal-400 mr-2" />
                        <span className="text-xs font-medium">AI Analysis Results</span>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center">
                          <div className="w-1 h-8 bg-teal-500 rounded-full mr-2"></div>
                          <div className="typing-animation">
                            Key finding: 37% accuracy improvement with the new approach
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat interface */}
                  <div className="relative">
                    <div className="bg-black/20 rounded-lg p-4 mb-4 border border-teal-500/10">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center border border-teal-500/30">
                          <Bot size={16} className="text-teal-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm mb-1 text-gray-300">
                            Based on the methodology section, the experimental group showed a statistically significant improvement (p&lt;0.01) compared to the control.
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Command input with advanced styling */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-cyan-500/10 to-teal-500/5 rounded-full blur-md"></div>
                      <div className="bg-black/50 rounded-full border border-teal-500/30 flex items-center p-1 backdrop-blur-sm glow relative">
                        <input 
                          type="text" 
                          placeholder="Ask about your document..." 
                          className="bg-transparent border-none outline-none flex-1 px-4 py-2 text-white placeholder-gray-400 text-sm"
                        />
                        <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black rounded-full p-2 hover:opacity-90 transition-all">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;