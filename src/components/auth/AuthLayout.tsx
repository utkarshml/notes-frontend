import React, { useEffect } from 'react';
import heroWaves from '@/assets/hero-waves.jpg';
import { useAuth } from '@/contexts/AuthContext';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const {isAuthenticated} = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard'
    }
  })
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      
      {/* Right side - Hero Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-hero p-16">
        <div className="w-full max-w-lg">
          <img 
            src={heroWaves} 
            alt="Beautiful flowing waves" 
            className="w-full h-auto rounded-2xl shadow-strong"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;