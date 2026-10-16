'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AdvancedSearchBar from './AdvancedSearchBar';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop',
      title: 'Tropical Paradise',
    },
    {
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop',
      title: 'Urban Luxury',
    },
    {
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&h=1080&fit=crop',
      title: 'Mountain Retreat',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Content Area - White with curved edge */}
      <div className="relative flex-1 flex flex-col justify-between px-6 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32 z-10 bg-white">
        {/* Organic curved edge */}
        <div
          className="absolute -right-1 top-0 bottom-0 w-20 lg:w-28 xl:w-36 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 1000' preserveAspectRatio='none'%3E%3Cpath d='M0 0 Q 120 100 0 250 Q 120 400 0 500 Q 120 650 0 750 Q 120 900 0 1000 L 120 1000 L 120 0 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '100% 100%',
          }}
        />

        <div className="relative max-w-xl">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-gray-800 leading-tight mb-6"
            style={{ fontFamily: 'Georgia, Garamond, serif' }}
          >
            You Have A Destination, We Have A Place.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 text-base sm:text-lg mb-10 max-w-lg"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>

          {/* Advanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AdvancedSearchBar />
          </motion.div>

          {/* Discover More Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Discover More</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border-2 border-[#7DD3FC] flex items-center justify-center text-[#0EA5E9] hover:bg-[#7DD3FC]/20 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-[#7DD3FC] flex items-center justify-center text-white hover:bg-[#38BDF8] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Social Media Icons - Bottom Left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-4 mt-8 lg:mt-0"
        >
          <motion.a
            whileHover={{ scale: 1.2, y: -2 }}
            href="#"
            className="text-gray-600 hover:text-[#E63946] transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, y: -2 }}
            href="#"
            className="text-gray-600 hover:text-[#E63946] transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Right Side - Background Image Carousel */}
      <div className="relative flex-1 min-h-[50vh] lg:min-h-screen">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
        {/* Curved white edge overlapping from left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 pointer-events-none hidden lg:block"
          style={{
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 1000' preserveAspectRatio='none'%3E%3Cpath d='M200 0 Q 0 250 200 500 Q 0 750 200 1000 L 0 1000 L 0 0 Z' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '100% 100%',
          }}
        />
        {/* Red triangular accent - bottom right */}
        <div
          className="absolute bottom-0 right-0 w-24 h-24 lg:w-32 lg:h-32"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, #E63946 50%)',
          }}
        />
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed inset-0 bg-white z-50 lg:hidden"
        >
          <AdvancedSearchBar isMobile={true} onSearch={() => setShowMobileSearch(false)} />
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
