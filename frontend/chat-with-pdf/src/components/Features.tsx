import React, { useState, useEffect, useRef } from 'react';
import { FileText, MessageSquare, Zap, Shield, Search, Database } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Calculate delay based on index for staggered animations
  const animationDelay = `${0.2 + index * 0.15}s`;
  
  return (
    <div 
      ref={cardRef}
      className={`relative group backdrop-blur-xl transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ animationDelay, transitionDelay: animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced glassmorphic card with depth */}
      <div className="h-full p-8 rounded-3xl relative overflow-hidden flex flex-col items-center z-10 border border-gray-800/50 bg-black/50 backdrop-blur-xl shadow-xl transition-all duration-700 group-hover:shadow-teal-500/20 group-hover:scale-105 group-hover:-translate-y-2">
        {/* Animated glowing borders with improved effect */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse-slow"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-teal-400 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-teal-400 to-transparent animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Enhanced animated gradient background with nebula effect */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-20' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-teal-400 to-blue-600 animate-gradient-shift"></div>
          
          {/* Nebula-like particle effect */}
          {isHovered && (
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-teal-400/40 animate-nebula-particle" 
                  style={{
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.2,
                    animationDuration: `${Math.random() * 8 + 4}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Enhanced icon container with interactive glow effect */}
        <div className={`relative mb-6 transition-all duration-700 ${isHovered ? 'scale-110 translate-y-2' : ''}`}>
          <div className={`absolute inset-0 bg-teal-400/20 rounded-full blur-xl transition-all duration-700 scale-90 ${isHovered ? 'bg-teal-400/50 blur-2xl scale-125' : ''}`}></div>
          <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-black p-0.5">
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-black to-gray-900 z-0"></div>
            <Icon className={`w-10 h-10 relative z-10 transition-all duration-700 ${isHovered ? 'text-teal-300 scale-110' : 'text-teal-400'}`} />
          </div>
          
          {/* Orbital ring animation */}
          <div className={`absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/20 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute w-2 h-2 bg-teal-400 rounded-full -top-1 left-1/2 -translate-x-1/2 animate-orbit"></div>
          </div>
          <div className={`absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/10 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}>
            <div className="absolute w-1.5 h-1.5 bg-teal-300 rounded-full -top-0.5 left-1/2 -translate-x-1/2 animate-orbit" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Enhanced content with animation */}
        <h3 className={`text-2xl font-bold bg-clip-text text-transparent transition-all duration-500 z-10 mb-4 text-center ${
          isHovered ? 'bg-gradient-to-r from-teal-300 to-white' : 'bg-gradient-to-r from-white to-gray-300'
        }`}>{title}</h3>
        
        <p className={`text-center transition-all duration-500 z-10 max-w-sm ${
          isHovered ? 'text-gray-200' : 'text-gray-400'
        }`}>{description}</p>
        
        {/* Enhanced floating particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-teal-400/70 animate-float-particle"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const [animateTitle, setAnimateTitle] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for parallax effect
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (sectionRef.current) {
//       const rect = sectionRef.current.getBoundingClientRect();
//       setMousePosition({
//         x: ((e.clientX - rect.left) / rect.width) - 0.5,
//         y: ((e.clientY - rect.top) / rect.height) - 0.5
//       });
//     }
//   };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateTitle(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);
  
  // Enhanced custom animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradient-shift {
        background-size: 300% 300%;
        animation: gradient-shift 12s ease infinite;
      }
      
      @keyframes pulse-slow {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
      }
      
      @keyframes float-particle {
        0% { transform: translate(0, 0); opacity: 0; }
        25% { opacity: 1; }
        75% { opacity: 1; }
        100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 30}px, ${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 30}px); opacity: 0; }
      }
      
      @keyframes nebula-particle {
        0% { transform: scale(1) translate(0, 0); }
        50% { transform: scale(1.5) translate(${Math.random() * 10}px, ${Math.random() * 10}px); opacity: ${0.4 + Math.random() * 0.6}; }
        100% { transform: scale(1) translate(0, 0); }
      }
      
      @keyframes orbit {
        0% { transform: rotate(0deg) translateX(12px) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
      }
      
      @keyframes starfield {
        0% { transform: translateY(0); }
        100% { transform: translateY(1000px); }
      }
      
      .animate-title-gradient {
        background-size: 300% auto;
        animation: title-gradient 2s ease-in-out infinite alternate;
      }
      
      @keyframes title-gradient {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
      
      .animate-bounce-slow {
        animation: bounce-slow 4s ease-in-out infinite;
      }
      
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      
      .text-glow {
        text-shadow: 0 0 10px rgba(45, 212, 191, 0.5), 0 0 20px rgba(45, 212, 191, 0.3);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const features = [
    {
      icon: FileText,
      title: "PDF Upload & Analysis",
      description: "Upload any PDF document and our AI will instantly analyze and index its content for seamless interaction."
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Chat naturally with your documents as if they were a knowledgeable expert on the content."
    },
    {
      icon: Search,
      title: "Instant Answers",
      description: "Get precise answers and insights from your documents without scrolling through countless pages."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Advanced processing ensures quick responses even with large, complex documents."
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your documents and conversations stay private with end-to-end encryption."
    },
    {
      icon: Database,
      title: "Knowledge Retention",
      description: "Save conversations and insights for future reference and continued learning."
    }
  ];
  
  return (
    <section id='features' 
      ref={sectionRef}
     
      className="bg-black py-32 px-4 relative overflow-hidden"
    >
      {/* Starfield background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-30 z-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `starfield ${Math.random() * 60 + 60}s linear infinite`,
                animationDelay: `-${Math.random() * 60}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced animated background with nebula effects */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Large gradient blobs with parallax effect */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-800/30 via-teal-400/20 to-blue-800/30 blur-3xl animate-pulse-slow"
          style={{ 
            top: '15%', 
            left: '10%', 
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-blue-800/20 via-teal-400/15 to-purple-800/20 blur-3xl animate-pulse-slow"
          style={{ 
            bottom: '10%', 
            right: '15%', 
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.5s ease-out' 
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-800/20 blur-3xl animate-pulse-slow"
          style={{ 
            top: '60%', 
            left: '60%', 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced title section with animations */}
        <div ref={titleRef} className="text-center mb-24">
          <div className={`transition-all duration-1000 transform ${
            animateTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          
            
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold animate-title-gradient bg-clip-text text-transparent bg-gradient-to-r from-lime-500 via-teal-400  to-cyan-500 mb-8 relative inline-block ">
            Your PDFs, Now Smarter Than Ever
              <div className="absolute -bottom-4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse-slow"></div>
            </h2>
          </div>
          
          <p className={`max-w-2xl mx-auto text-gray-300 text-xl transition-all duration-1000 delay-300 transform ${
            animateTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Experience AI-powered conversations with your PDFs that make information retrieval intuitive and effortless
          </p>
        </div>
        
        {/* Enhanced feature grid with stagger effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
        
        {/* Enhanced CTA section */}
        <div className={`mt-24 text-center transition-all duration-1000 delay-1000 transform ${
          animateTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Neon glow button with animated effects */}
          <button className="relative group px-10 py-5 bg-black rounded-full overflow-hidden">
            {/* Button background effects with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-teal-400/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift"></div>
            <div className="absolute inset-0.5 bg-black rounded-full z-10"></div>
            
            {/* Enhanced button glow effect */}
            <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md bg-gradient-to-r from-purple-600/70 via-teal-400/70 to-blue-600/70 animate-pulse-slow"></div>
            
            {/* Animated particles around the button on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-teal-400"
                  style={{
                    top: `${50 + (Math.random() * 40 - 20)}%`,
                    left: `${Math.random() > 0.5 ? -5 : 105}%`,
                    animation: `float-particle ${2 + Math.random() * 3}s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Button text with enhanced gradient effect */}
            <span className="relative z-20 font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 group-hover:from-teal-300 group-hover:to-white transition-all duration-500">
              Try It Now
            </span>
          </button>
          
          <p className="text-gray-400 mt-5 animate-bounce-slow">No credit card required. Start for free.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;