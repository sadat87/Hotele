'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Waves, Dumbbell, Coffee, UtensilsCrossed, Car, ConciergeBell, Spa, Tv, Wind, Shield, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const amenities = [
  { icon: Wifi, name: 'Free WiFi', description: 'High-speed internet throughout the property' },
  { icon: Waves, name: 'Swimming Pool', description: 'Outdoor and indoor pools available' },
  { icon: Spa, name: 'Spa & Wellness', description: 'Full-service spa and wellness center' },
  { icon: Dumbbell, name: 'Fitness Center', description: 'State-of-the-art gym equipment' },
  { icon: Coffee, name: 'Coffee Shop', description: 'Premium coffee and pastries' },
  { icon: UtensilsCrossed, name: 'Fine Dining', description: 'Award-winning restaurants' },
  { icon: Car, name: 'Valet Parking', description: 'Complimentary valet service' },
  { icon: ConciergeBell, name: '24/7 Concierge', description: 'Round-the-clock assistance' },
  { icon: Tv, name: 'Entertainment', description: 'Smart TVs and streaming services' },
  { icon: Wind, name: 'Air Conditioning', description: 'Climate-controlled rooms' },
  { icon: Shield, name: 'Security', description: '24/7 security and surveillance' },
  { icon: Heart, name: 'Pet Friendly', description: 'Welcome your furry friends' },
];

export default function AmenitiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-serif italic text-gray-900 mb-4"
              style={{ fontFamily: 'Georgia, Garamond, serif' }}
            >
              World-Class Amenities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Experience luxury and comfort with our premium amenities designed to enhance your stay
            </motion.p>
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <motion.div
                    key={amenity.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-[#E63946]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#E63946] transition-colors"
                    >
                      <IconComponent className="w-8 h-8 text-[#E63946] group-hover:text-white transition-colors" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{amenity.name}</h3>
                    <p className="text-gray-600">{amenity.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif italic text-gray-900 mb-6"
              style={{ fontFamily: 'Georgia, Garamond, serif' }}
            >
              Your Comfort is Our Priority
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed"
            >
              Every detail has been carefully considered to ensure your stay is nothing short of exceptional. 
              From our state-of-the-art facilities to our attentive service, we're committed to providing 
              an unforgettable experience that exceeds your expectations.
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
