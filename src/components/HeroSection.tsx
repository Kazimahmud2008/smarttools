import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function HeroSection() {
  const [typingText, setTypingText] = useState('All-in-One');
  
  const phrases = ['All-in-One', 'Professional', 'Lightning Fast', 'Secure'];
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      setTypingText(phrases[currentIndex]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg animate-gradient"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="particle top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="particle top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="particle bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="particle bottom-1/3 right-1/3 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="particle top-1/2 left-1/2 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          <span className="block">{typingText}</span>
          <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Free Online Tools
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up">
          35+ Professional utilities for developers, marketers, and everyday users. 
          <span className="font-semibold block mt-2">Fast, Free, and Reliable.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up">
          <Link href="/tools">
            <Button size="lg" className="bg-white text-slate-800 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <i className="fas fa-rocket mr-2"></i>
              Explore Tools
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-slate-800 transition-all duration-300"
          >
            <i className="fas fa-play mr-2"></i>
            Watch Demo
          </Button>
        </div>
        
        {/* Tool Preview Icons */}
        <div className="flex items-center justify-center space-x-8 mt-12 animate-bounce-gentle">
          <div className="glassmorphism p-4 rounded-full">
            <i className="fas fa-qrcode text-white text-2xl"></i>
          </div>
          <div className="glassmorphism p-4 rounded-full">
            <i className="fas fa-key text-white text-2xl"></i>
          </div>
          <div className="glassmorphism p-4 rounded-full">
            <i className="fas fa-calculator text-white text-2xl"></i>
          </div>
          <div className="glassmorphism p-4 rounded-full">
            <i className="fas fa-palette text-white text-2xl"></i>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <i className="fas fa-chevron-down text-2xl opacity-70"></i>
      </div>
    </section>
  );
}
