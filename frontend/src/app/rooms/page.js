'use client';

import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';
import AdvancedSearchBar from '../components/AdvancedSearchBar';
import { useBookingStore } from '@/store/bookingStore';

// Mock room data
const mockRooms = [
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
    bedType: 'King',
    starRating: 5,
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
    bedType: 'Queen',
    starRating: 5,
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
    bedType: 'King',
    starRating: 4,
  },
  {
    id: 4,
    name: 'Tropical Paradise Bungalow',
    location: 'Bali, Indonesia',
    price: 199,
    rating: 4.8,
    beds: 1,
    capacity: 2,
    amenities: ['WiFi', 'Beach', 'Yoga', 'Bar'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    availability: 8,
    bedType: 'Queen',
    starRating: 4,
  },
  {
    id: 5,
    name: 'Heritage Boutique Room',
    location: 'Paris, France',
    price: 319,
    rating: 4.9,
    beds: 1,
    capacity: 2,
    amenities: ['WiFi', 'Historic', 'Cafe', 'Concierge'],
    image: 'https://images.unsplash.com/photo-1543259741-2ea3ebead61f?w=800&h=600&fit=crop',
    availability: 4,
    bedType: 'King',
    starRating: 5,
  },
  {
    id: 6,
    name: 'Skyline Executive Suite',
    location: 'Dubai, UAE',
    price: 459,
    rating: 4.8,
    beds: 2,
    capacity: 4,
    amenities: ['WiFi', 'Pool', 'Fine Dining', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop',
    availability: 3,
    bedType: 'King',
    starRating: 5,
  },
];

export default function RoomsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBedType, setSelectedBedType] = useState('all');
  const [selectedStarRating, setSelectedStarRating] = useState('all');
  const { currency } = useBookingStore();

  const filteredRooms = useMemo(() => {
    return mockRooms.filter((room) => {
      if (room.price < priceRange[0] || room.price > priceRange[1]) return false;
      if (selectedBedType !== 'all' && room.bedType !== selectedBedType) return false;
      if (selectedStarRating !== 'all' && room.starRating !== parseInt(selectedStarRating)) return false;
      return true;
    });
  }, [priceRange, selectedBedType, selectedStarRating]);

  const bedTypes = ['all', 'King', 'Queen'];
  const starRatings = ['all', '5', '4', '3'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        {/* Hero Section with Search */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl sm:text-5xl font-serif italic text-gray-900 mb-4" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
                Discover Your Perfect Room
              </h1>
              <p className="text-gray-600 text-lg">Find luxury accommodations tailored to your preferences</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AdvancedSearchBar />
            </motion.div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif text-gray-900">
                {filteredRooms.length} Rooms Available
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showFilters ? 1 : 0, x: showFilters ? 0 : -20 }}
                className={`lg:block ${showFilters ? 'block' : 'hidden'}`}
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter Rooms
                  </h3>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range ({currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'})
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{priceRange[0]}</span>
                        <span>{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bed Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bed Type</label>
                    <div className="space-y-2">
                      {bedTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedBedType(type)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedBedType === type
                              ? 'bg-[#E63946] text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {type === 'all' ? 'All Types' : type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
                    <div className="space-y-2">
                      {starRatings.map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setSelectedStarRating(rating)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedStarRating === rating
                              ? 'bg-[#E63946] text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>

              {/* Room Grid */}
              <div className="lg:col-span-3">
                {filteredRooms.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No rooms match your filters. Try adjusting your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRooms.map((room, index) => (
                      <RoomCard key={room.id} room={room} index={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
