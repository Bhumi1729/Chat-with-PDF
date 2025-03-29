import React from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';

const AnimatedFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id='contact' className="relative bg-black border-t border-gray-800 pt-12 pb-8 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjEgMSAyLjEgMi4yIDAgMS4yLTEgMi4yLTIuMSAyLjItMS4yIDAtMi4xLTEtMi4xLTIuMiAwLTEuMiAxLTIuMiAyLjEtMi4yeiIgc3Ryb2tlPSIjMDk2NjVmIiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNNjAgMzBjMS4yIDAgMi4xIDEgMi4xIDIuMiAwIDEuMi0xIDIuMi0yLjEgMi4yLTEuMiAwLTIuMS0xLTIuMS0yLjIgMC0xLjIgMS0yLjIgMi4xLTIuMnoiIHN0cm9rZT0iIzA5NjY1ZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI0IDQyYzEuMiAwIDIuMSAxIDIuMSAyLjIgMCAxLjItMSAyLjItMi4xIDIuMi0xLjIgMC0yLjEtMS0yLjEtMi4yIDAtMS4yIDEtMi4yIDIuMS0yLjJ6IiBzdHJva2U9IiMwOTY2NWYiIHN0cm9rZS1vcGFjaXR5PSIuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo & tagline */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-teal-400">Askify</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-xs">
              Unlock the knowledge in your documents with AI-powered conversations
            </p>
          </div>
          
          {/* Navigation & Social */}
          <div className="flex flex-col items-center md:items-end">
            {/* Quick links */}
            <div className="flex space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Features</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Upload</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Help</a>
            </div>
            
            {/* Social icons with hover animations */}
            <div className="flex space-x-4">
              <a href="#" className="group">
                <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-teal-400 group-hover:bg-black transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-teal-400/20">
                  <Twitter size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-teal-400 group-hover:bg-black transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-teal-400/20">
                  <Linkedin size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-teal-400 group-hover:bg-black transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-teal-400/20">
                  <Github size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-teal-400 group-hover:bg-black transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-teal-400/20">
                  <Mail size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider with animation */}
        <div className="relative h-px w-full bg-gray-900 my-6 overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent animate-pulse"></div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} PDFChat. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors duration-300">Privacy</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors duration-300">Terms</a>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button with animation */}
      <button 
        onClick={scrollToTop}
        className="absolute right-6 top-5 w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-teal-400 hover:bg-black transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-teal-400/20 group"
      >
        <ArrowUp size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300" />
      </button>
    </footer>
  );
};

export default AnimatedFooter;