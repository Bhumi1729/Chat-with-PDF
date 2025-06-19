import React, { useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  onGoogleLogin?: () => void;
  onLoginSuccess?: () => void; // Navigation callback
  navigateTo?: string; // Optional redirect path
}

// Default props
const defaultProps: LoginFormProps = {
  onSubmit: () => console.log("Login form submitted"),
  onGoogleLogin: () => console.log("Google login clicked"),
  onLoginSuccess: () => {
    // Default redirect to /chat
    window.location.href = '/chat';
  },
  navigateTo: '/chat'
};

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
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

const LoginPage: React.FC<LoginFormProps> = (props) => {
  // Merge provided props with default props
  const { onSubmit, onGoogleLogin, onLoginSuccess, navigateTo } = { ...defaultProps, ...props };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const auth = getAuth(app);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRedirect = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      // Fallback direct navigation
      window.location.href = navigateTo || '/chat';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Call Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      // If provided, call the onSubmit callback
      if (onSubmit) {
        onSubmit(email, password);
      }
      // Redirect to chat
      handleRedirect();
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // If provided, call the onGoogleLogin callback
      if (onGoogleLogin) {
        onGoogleLogin();
      }
      // Redirect to chat
      handleRedirect();
    } catch (error: any) {
      console.error("Google login error:", error);
      setError(error.message || 'Failed to sign in with Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Improved background with subtle gradient and dots */}
      <div className="fixed inset-0 bg-[#050505]">
        {/* Abstract gradient shapes */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-teal-500/5 rounded-full blur-3xl" 
          style={{ 
            transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 20 - 10}px)` 
          }}
        />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-teal-600/5 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${-mousePosition.x * 20 + 10}px, ${-mousePosition.y * 20 + 10}px)` 
          }}
        />
        
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full dot-pattern"></div>
        </div>
        
        {/* Subtle scan lines */}
        <div className="absolute inset-0 bg-scan-lines opacity-5"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo above the card */}
        <div className="flex justify-center mb-6">
          <div className="text-4xl font-bold text-white flex items-center tracking-wide">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Ask</span>
            <span className="text-white">ify</span>
            <div className="ml-2 relative w-5 h-5">
              <div className="absolute inset-0 bg-teal-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Improved card design */}
        <div className="relative group">
          {/* Card glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-teal-300 rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Card content */}
          <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Top design element */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-300"></div>
            
            {/* Card body with improved spacing */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h2>
              <p className="text-gray-400 text-center mb-8">Sign in to your account to continue</p>

              {/* Error display */}
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              {/* Login Form with improved styling */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Email input */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1 ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-10 pr-4
                        focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400
                        placeholder-gray-600 transition-all duration-200"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1 ml-1">Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-10 pr-4
                        focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400
                        placeholder-gray-600 transition-all duration-200"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 accent-teal-500 bg-gray-900 border-gray-700 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-gray-400">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <a href="#" className="font-medium text-teal-400 hover:text-teal-300 transition-all hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 space-y-3">
                    {/* Sign in button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg
                      bg-gradient-to-r from-teal-600 to-teal-400
                      text-black font-medium shadow-lg shadow-teal-500/10
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-teal-500
                      hover:shadow-teal-500/20 transition-all duration-200 relative overflow-hidden group"
                    >
                      {/* Button shine effect */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform -translate-x-full group-hover:animate-shine"></span>
                      
                      {isLoading ? (
                        <svg className="animate-spin mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                    
                    {/* Divider */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-black text-gray-500">Or continue with</span>
                      </div>
                    </div>
                    
                    {/* Google Login Button */}
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex justify-center items-center py-3 px-4 
                      border border-gray-800 rounded-lg
                      bg-gray-900 hover:bg-gray-800 text-white font-medium
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500
                      transition-all duration-200"
                    >
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        <path fill="none" d="M1 1h22v22H1z" />
                      </svg>
                      Google
                    </button>
                  </div>
                </div>
              </form>

              {/* Sign up link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-teal-400 hover:text-teal-300 transition-colors hover:underline">
                    Sign up now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative element at bottom */}
        <div className="flex justify-center mt-6">
          <div className="h-1 w-12 bg-gradient-to-r from-teal-500/50 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Style JSX alternatives for React */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shine {
            100% { transform: translateX(100%); }
          }
          .animate-shine {
            animation: shine 1.5s ease-in-out;
          }
          
          .dot-pattern {
            background-image: radial-gradient(circle, rgba(20, 184, 166, 0.2) 1px, transparent 1px);
            background-size: 30px 30px;
          }
          
          .bg-scan-lines {
            background: repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.05) 1px,
              rgba(255, 255, 255, 0.05) 2px
            );
          }
        `
      }} />
    </div>
  );
};

// Set default props
LoginPage.defaultProps = defaultProps;

export default LoginPage;