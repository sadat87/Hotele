'use client';

import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import TestimonialsSlider from './components/TestimonialsSlider';
import RoomCard from './components/RoomCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Featured rooms for homepage
const featuredRooms = [
  {
    id: 1,
    name: 'Deluxe Ocean View Suite',
    location: 'Maldives',
    price: 349,
    rating: 4.9,
    beds: 1,
    capacity: 2,
    amenities: ['WiFi', 'Pool', 'Spa', 'Breakfast'],
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
    availability: 2,
  },
  {
    id: 2,
    name: 'Luxury City Penthouse',
    location: 'New York, USA',
    price: 599,
    rating: 4.8,
    beds: 2,
    capacity: 4,
    amenities: ['WiFi', 'Gym', 'Rooftop', 'Concierge'],
    image: 'https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=800&h=600&fit=crop',
    availability: 5,
  },
  {
    id: 3,
    name: 'Mountain Retreat Villa',
    location: 'Swiss Alps',
    price: 429,
    rating: 4.7,
    beds: 3,
    capacity: 6,
    amenities: ['WiFi', 'Fireplace', 'Skiing', 'Sauna'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    availability: 1,
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      
      {/* Discover More - Featured Rooms */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-serif italic text-gray-900 mb-4" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
              Discover More
            </h2>
            <p className="text-gray-600 text-lg">Explore our handpicked selection of luxury accommodations</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredRooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/rooms">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#E63946] text-white font-semibold rounded-lg hover:bg-[#d32f3d] transition-colors"
              >
                View All Rooms
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Map Placeholder */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-serif italic text-gray-900 mb-4" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
              Find Us Around The World
            </h2>
            <p className="text-gray-600 text-lg">Explore our locations on the map</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-96"
          >
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Map Integration Placeholder (Mapbox/Google Maps)</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
