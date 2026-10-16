'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, MapPin, Search, ChevronDown, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-day-picker/dist/style.css';
import { useBookingStore } from '@/store/bookingStore';
import { useRouter } from 'next/navigation';

const AdvancedSearchBar = ({ isMobile = false, onSearch }) => {
  const router = useRouter();
  const {
    checkIn,
    checkOut,
    guests,
    location,
    setSearchParams,
  } = useBookingStore();

  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [locationInput, setLocationInput] = useState(location || '');
  const [filteredLocations, setFilteredLocations] = useState([]);

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const guestsRef = useRef(null);
  const locationRef = useRef(null);

  const popularLocations = [
    'New York, USA',
    'Paris, France',
    'Tokyo, Japan',
    'London, UK',
    'Dubai, UAE',
    'Bali, Indonesia',
    'Maldives',
    'Swiss Alps',
    'Barcelona, Spain',
    'Sydney, Australia',
  ];

  useEffect(() => {
    if (locationInput) {
      const filtered = popularLocations.filter((loc) =>
        loc.toLowerCase().includes(locationInput.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(popularLocations.slice(0, 5));
    }
  }, [locationInput]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (checkInRef.current && !checkInRef.current.contains(event.target)) {
        setShowCheckIn(false);
      }
      if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
        setShowCheckOut(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target)) {
        setShowGuests(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocation(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    setSearchParams({
      checkIn,
      checkOut,
      guests,
      location: locationInput,
    });
    if (onSearch) {
      onSearch();
    } else {
      router.push('/rooms');
    }
  };

  const updateGuests = (type, delta) => {
    const newGuests = { ...guests };
    newGuests[type] = Math.max(0, newGuests[type] + delta);
    setSearchParams({ guests: newGuests });
  };

  const Container = isMobile ? motion.div : 'div';

  return (
    <Container
      initial={isMobile ? { y: 100, opacity: 0 } : {}}
      animate={isMobile ? { y: 0, opacity: 1 } : {}}
      className={`bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden ${
        isMobile ? 'fixed bottom-0 left-0 right-0 z-50 p-4 max-h-[90vh] overflow-y-auto' : ''
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Location */}
        <div className="flex-1 relative border-b lg:border-b-0 lg:border-r border-gray-200" ref={locationRef}>
          <button
            onClick={() => {
              setShowLocation(!showLocation);
              setShowCheckIn(false);
              setShowCheckOut(false);
              setShowGuests(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <MapPin className="w-5 h-5 text-[#E63946]" />
            <div className="flex-1 text-left">
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                Location
              </label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onFocus={() => setShowLocation(true)}
                placeholder="Where are you going?"
                className="w-full text-sm text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
              />
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showLocation ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showLocation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto"
              >
                {filteredLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocationInput(loc);
                      setShowLocation(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#E63946]/10 hover:text-[#E63946] transition-colors"
                  >
                    {loc}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Check In */}
        <div className="flex-1 relative border-b lg:border-b-0 lg:border-r border-gray-200" ref={checkInRef}>
          <button
            onClick={() => {
              setShowCheckIn(!showCheckIn);
              setShowCheckOut(false);
              setShowGuests(false);
              setShowLocation(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-5 h-5 text-[#E63946]" />
            <div className="flex-1 text-left">
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                Check In
              </label>
              <span className="text-sm text-gray-900">
                {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCheckIn ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showCheckIn && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4"
              >
                <DayPicker
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setSearchParams({ checkIn: date });
                    setShowCheckIn(false);
                  }}
                  disabled={(date) => date < new Date()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Check Out */}
        <div className="flex-1 relative border-b lg:border-b-0 lg:border-r border-gray-200" ref={checkOutRef}>
          <button
            onClick={() => {
              setShowCheckOut(!showCheckOut);
              setShowCheckIn(false);
              setShowGuests(false);
              setShowLocation(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-5 h-5 text-[#E63946]" />
            <div className="flex-1 text-left">
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                Check Out
              </label>
              <span className="text-sm text-gray-900">
                {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCheckOut ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showCheckOut && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4"
              >
                <DayPicker
                  mode="single"
                  selected={checkOut}
                  onSelect={(date) => {
                    if (!checkIn || date > checkIn) {
                      setSearchParams({ checkOut: date });
                      setShowCheckOut(false);
                    }
                  }}
                  disabled={(date) => date < (checkIn || new Date())}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guests */}
        <div className="flex-1 relative border-b lg:border-b-0" ref={guestsRef}>
          <button
            onClick={() => {
              setShowGuests(!showGuests);
              setShowCheckIn(false);
              setShowCheckOut(false);
              setShowLocation(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-5 h-5 text-[#E63946]" />
            <div className="flex-1 text-left">
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                Guests
              </label>
              <span className="text-sm text-gray-900">
                {guests.adults + guests.children} {guests.adults + guests.children === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showGuests ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showGuests && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 w-64"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Adults</div>
                      <div className="text-sm text-gray-500">Ages 13+</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateGuests('adults', -1)}
                        disabled={guests.adults === 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{guests.adults}</span>
                      <button
                        onClick={() => updateGuests('adults', 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Children</div>
                      <div className="text-sm text-gray-500">Ages 0-12</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateGuests('children', -1)}
                        disabled={guests.children === 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{guests.children}</span>
                      <button
                        onClick={() => updateGuests('children', 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-8 py-4 bg-[#E63946] text-white text-sm font-medium uppercase tracking-wide hover:bg-[#d32f3d] transition-colors flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </Container>
  );
};

export default AdvancedSearchBar;
