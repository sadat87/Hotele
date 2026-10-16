'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Bed, Users, ArrowRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookingWorkflow from '../../components/BookingWorkflow';
import { useBookingStore } from '@/store/bookingStore';

// Mock room data
const mockRoom = {
  id: 1,
  name: 'Deluxe Ocean View Suite',
  location: 'Maldives',
  price: 349,
  rating: 4.9,
  beds: 1,
  capacity: 2,
  amenities: ['WiFi', 'Pool', 'Spa', 'Breakfast', 'Room Service', 'Mini Bar'],
  images: [
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop',
  ],
  description: 'Experience luxury in our Deluxe Ocean View Suite with stunning panoramic views of the crystal-clear waters. This spacious suite features a king-size bed, private balcony, and premium amenities.',
  availability: 2,
};

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { setCurrentStep } = useBookingStore();

  const handleBookNow = () => {
    setCurrentStep(1);
    router.push('/booking');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        {/* Room Images */}
        <section className="h-[60vh] overflow-hidden">
          <div className="grid grid-cols-3 gap-2 h-full">
            {mockRoom.images.map((img, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                src={img}
                alt={`${mockRoom.name} - Image ${index + 1}`}
                className={`w-full h-full object-cover ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              />
            ))}
          </div>
        </section>

        {/* Room Details */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-4xl font-serif italic text-gray-900 mb-2" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
                        {mockRoom.name}
                      </h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{mockRoom.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                      <span className="text-xl font-semibold">{mockRoom.rating}</span>
                    </div>
                  </div>

                  {mockRoom.availability && mockRoom.availability <= 3 && (
                    <div className="mb-6 p-4 bg-[#E63946]/10 border border-[#E63946] rounded-lg">
                      <p className="text-[#E63946] font-semibold">
                        ⚠️ Only {mockRoom.availability} {mockRoom.availability === 1 ? 'room' : 'rooms'} left!
                      </p>
                    </div>
                  )}

                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed text-lg">{mockRoom.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <Bed className="w-6 h-6 text-[#E63946]" />
                      <div>
                        <p className="text-sm text-gray-500">Beds</p>
                        <p className="font-semibold text-gray-900">{mockRoom.beds} {mockRoom.beds === 1 ? 'Bed' : 'Beds'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-[#E63946]" />
                      <div>
                        <p className="text-sm text-gray-500">Capacity</p>
                        <p className="font-semibold text-gray-900">{mockRoom.capacity} Guests</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockRoom.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#E63946] rounded-full" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24"
                >
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-[#E63946]">${mockRoom.price}</span>
                      <span className="text-gray-600">/ night</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{mockRoom.rating} (284 reviews)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBookNow}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#E63946] text-white font-semibold rounded-lg hover:bg-[#d32f3d] transition-colors mb-4"
                  >
                    Book Now
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
