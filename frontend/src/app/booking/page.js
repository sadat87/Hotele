'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingWorkflow from '../components/BookingWorkflow';
import { useBookingStore } from '@/store/bookingStore';

const mockRoom = {
  id: 1,
  name: 'Deluxe Ocean View Suite',
  location: 'Maldives',
  price: 349,
  image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
  beds: 1,
  capacity: 2,
};

export default function BookingPage() {
  const { selectedRoom } = useBookingStore();
  const room = selectedRoom || mockRoom;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWorkflow room={room} />
        </div>
      </main>
      <Footer />
    </>
  );
}
