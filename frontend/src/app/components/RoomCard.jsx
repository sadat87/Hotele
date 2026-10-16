'use client';

import React from 'react';
import { Star, MapPin, Bed, Users, Wifi, Coffee, Waves, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useBookingStore } from '@/store/bookingStore';

const RoomCard = ({ room, index = 0 }) => {
  const { currency, setSelectedRoom } = useBookingStore();
  
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const formatPrice = (price) => {
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${price}`;
  };

  const handleQuickView = () => {
    setSelectedRoom(room);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={room.image || 'https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=800&h=600&fit=crop'}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        {/* Availability Badge */}
        {room.availability && room.availability <= 3 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 bg-[#E63946] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
          >
            Only {room.availability} left!
          </motion.div>
        )}
        {/* Rating Badge */}
        {room.rating && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">{room.rating}</span>
          </div>
        )}
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickView}
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-xl"
          >
            Quick View
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-serif text-gray-900 mb-1">{room.name}</h3>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{room.location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#E63946]">{formatPrice(room.price)}</p>
            <p className="text-xs text-gray-500">per night</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities?.slice(0, 4).map((amenity, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Room Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {room.beds && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{room.beds} {room.beds === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          {room.capacity && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{room.capacity} Guests</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/rooms/${room.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#E63946] text-white font-medium rounded-lg hover:bg-[#d32f3d] transition-colors"
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
