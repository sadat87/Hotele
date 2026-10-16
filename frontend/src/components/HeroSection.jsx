import React from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const handleDiscoverClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop"
          alt="Luxury Hotel"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-40 flex items-center justify-between px-8 lg:px-16 py-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-white flex items-center justify-center rounded">
            <span className="text-white font-bold text-sm">■</span>
          </div>
          <h1 className="text-white text-2xl font-serif italic">The Grand</h1>
        </div>

        {/* Menu Items */}
        <div className="hidden lg:flex items-center gap-10">
          <a href="#" className="text-white/90 hover:text-white font-light transition">
            Home
          </a>
          <a href="#" className="text-white/90 hover:text-white font-light transition">
            Browse Hotels
          </a>
          <a href="#" className="text-white/90 hover:text-white font-light transition">
            Destinations
          </a>
          <a href="#" className="text-white/90 hover:text-white font-light transition">
            Offers
          </a>
          <a href="#" className="text-white/90 hover:text-white font-light transition">
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-white/90 hover:text-white font-light flex items-center gap-2 transition">
            → Sign In
          </button>
          <button className="border border-white text-white px-6 py-2 font-light hover:bg-white/10 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Content - Centered */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Welcome Text */}
        <p className="text-white/80 text-lg tracking-[0.15em] font-light mb-8 uppercase">
          Welcome to
        </p>

        {/* Hotel Name */}
        <h1
          className="text-white text-7xl lg:text-8xl font-serif italic mb-4 max-w-4xl leading-tight drop-shadow-lg"
          style={{
            fontFamily: 'Georgia, serif',
            fontWeight: '400',
            letterSpacing: '0.02em',
          }}
        >
          The Grand
        </h1>

        {/* Subtitle with Decorative Line */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-white/50"></div>
            <p className="text-white/80 text-sm tracking-[0.1em] uppercase font-light">
              Resort & Spa Hotel
            </p>
            <div className="w-12 h-px bg-white/50"></div>
          </div>
          {/* Decorative Dot */}
          <div className="w-2 h-2 rounded-full bg-white/60 mt-2"></div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-lg max-w-2xl mb-12 font-light leading-relaxed">
          Experience unparalleled luxury and comfort in the heart of elegance
        </p>

        {/* Discover Now Button */}
        <button
          onClick={handleDiscoverClick}
          className="group relative bg-white text-gray-900 px-12 py-3 font-semibold tracking-widest text-sm hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <span className="flex items-center gap-2">
            DISCOVER NOW
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <p className="text-white/50 text-xs uppercase tracking-widest">Scroll</p>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

export default HeroSection;
