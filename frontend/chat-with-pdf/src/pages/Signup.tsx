import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile 
} from 'firebase/auth';
// Remove Next.js router import
// import { useRouter } from 'next/router';
// Use React Router instead
import { useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3ajt2catMO8SiucLUcNYyDf_zlAsom9w",
  authDomain: "askify---chat-with-pdf.firebaseapp.com",
  projectId: "askify---chat-with-pdf",
  storageBucket: "askify---chat-with-pdf.firebasestorage.app",
  messagingSenderId: "880845637386",
  appId: "1:880845637386:web:e6b66a9f3c00373c56dcf3",
  measurementId: "G-SNG0CSL136"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState('');
  // Replace Next.js router with React Router's navigate
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    setError('');
    
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
        
        console.log('User created successfully:', userCredential.user);
        // Redirect to dashboard or home page after successful signup
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSigningUp(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      console.log('Google signup successful:', result.user);
      // Redirect to chat page after successful signup
      navigate('/chat');
    } catch (err: any) {
      console.error('Google signup error:', err);
      setError(err.message || 'An error occurred during Google signup');
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-0 relative overflow-hidden">
      {/* Background elements - only visible on desktop */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {/* Abstract shapes in background */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-0 w-60 h-60 bg-teal-500/5 rounded-full blur-2xl" />
        
        {/* Grid pattern overlay for depth */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Main content container */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Card - full screen on mobile, normal on desktop */}
        <motion.div 
          className="relative bg-black/80 backdrop-filter backdrop-blur-xl rounded-none md:rounded-2xl border-0 md:border-2 border-teal-500/30 shadow-2xl shadow-teal-500/20 p-8 md:p-10 overflow-hidden transition-all duration-300 min-h-screen md:min-h-0 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ 
            y: -8, 
            boxShadow: "0 20px 25px -5px rgba(45, 212, 191, 0.2), 0 10px 10px -5px rgba(16, 185, 129, 0.2)",
            borderColor: "rgba(45, 212, 191, 0.5)"
          }}
        >
          {/* Card background effects with increased visibility */}
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/30 rounded-full blur-2xl" />
            <motion.div 
              className="absolute top-1/2 left-1/2 w-full h-full border border-teal-500/30 rounded-xl"
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ 
                scale: [0.8, 1.05, 0.8],
                opacity: [0.3, 0.2, 0.3],
                x: "-50%",
                y: "-50%",
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 flex flex-col justify-center min-h-screen md:min-h-0">
            {/* Shiny logo element for branding */}
            <motion.div 
              className="w-16 h-16 mx-auto mb-6 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-300 rounded-full opacity-80"></div>
              <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-200">A</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
            </motion.div>
            
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-200 mb-2 text-center">
              Join Askify
            </h2>
            <p className="text-teal-100/80 text-center pb-2 mb-6">Upload PDFs, ask questions, get AI answers</p>
            
            {/* Error message display */}
            {error && (
              <motion.div 
                className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-teal-300">
                  Full Name
                </label>
                <div className="relative group">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-teal-500/40 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                    required
                  />
                  <div className="absolute inset-0 rounded-lg border border-teal-400/0 group-hover:border-teal-400/50 transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-teal-300">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-teal-500/40 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                  <div className="absolute inset-0 rounded-lg border border-teal-400/0 group-hover:border-teal-400/50 transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-teal-300">
                  Password
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/60 border border-teal-500/40 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••••"
                    required
                  />
                  <div className="absolute inset-0 rounded-lg border border-teal-400/0 group-hover:border-teal-400/50 transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-400 text-white font-medium rounded-lg py-3 px-4 text-center transition-all duration-300 shadow-lg shadow-teal-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden group"
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 10px 15px -3px rgba(45, 212, 191, 0.4), 0 4px 6px -4px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="relative z-10">
                  {isSigningUp ? 'Creating Account...' : 'Sign up with Email'}
                </span>
                <motion.span 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                />
                <motion.span 
                  className="absolute inset-0 bg-white/20 -z-0"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: isSigningUp ? "0%" : "-100%", opacity: isSigningUp ? 1 : 0 }}
                  transition={{ duration: 1.5, repeat: isSigningUp ? Infinity : 0 }}
                />
              </motion.button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-teal-500/20 absolute w-full"></div>
                <span className="bg-black/80 px-4 text-sm text-teal-200/70 relative">or</span>
              </div>

              <motion.button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isSigningUp}
                className="w-full bg-black/60 border border-teal-500/40 text-white font-medium rounded-lg py-3 px-4 text-center transition-all duration-300 disabled:hover:translate-y-0 flex items-center justify-center space-x-2 relative overflow-hidden group"
                whileHover={{ 
                  y: -4, 
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  boxShadow: "0 10px 15px -3px rgba(45, 212, 191, 0.3), 0 4px 6px -4px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                <span className="relative z-10">
                  {isSigningUp ? 'Connecting...' : 'Sign up with Google'}
                </span>
                <div className="absolute inset-0 border border-teal-400/0 rounded-lg group-hover:border-teal-400/50 transition-colors duration-300" />
              </motion.button>

              <motion.div 
                className="text-center mt-4 text-sm text-teal-200/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Already have an account?{' '}
                {/* Replace Next.js link with React Router Link */}
                <a href="/login" className="text-teal-400 hover:text-teal-300 transition-colors duration-300 font-medium">
                  Log in
                </a>
              </motion.div>
            </form>
          </div>
        </motion.div>
        
        {/* Enhanced card glow effect - only visible on desktop */}
        <div className="absolute inset-0 -z-10 hidden md:block">
          <motion.div
            className="absolute w-full h-full rounded-xl bg-gradient-to-br from-teal-500/30 to-emerald-500/30 opacity-40 blur-3xl"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.5, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            whileHover={{ opacity: 0.6 }}
          />
        </div>
        
        {/* Add subtle floating particles for depth - only visible on desktop */}
        <motion.div className="absolute -z-20 w-full h-full hidden md:block">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-teal-400/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* CSS for grid pattern - Fixed JSX style issue */}
      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(20, 184, 166, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;