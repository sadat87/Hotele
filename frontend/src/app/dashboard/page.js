'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CreditCard, User, Settings, LogOut } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const mockBookings = [
  {
    id: 1,
    roomName: 'Deluxe Ocean View Suite',
    location: 'Maldives',
    checkIn: '2025-03-15',
    checkOut: '2025-03-20',
    guests: 2,
    total: 1745,
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    roomName: 'Luxury City Penthouse',
    location: 'New York, USA',
    checkIn: '2025-04-10',
    checkOut: '2025-04-15',
    guests: 4,
    total: 2995,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=400&h=300&fit=crop',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-serif italic text-gray-900 mb-2" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
              My Dashboard
            </h1>
            <p className="text-gray-600">Manage your bookings and profile settings</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-[#E63946] flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-600">john.doe@example.com</p>
                  </div>
                </div>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'bookings'
                        ? 'bg-[#E63946] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    My Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-[#E63946] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'payment'
                        ? 'bg-[#E63946] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-900">My Bookings</h2>
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <img
                          src={booking.image}
                          alt={booking.roomName}
                          className="w-full md:w-64 h-48 md:h-auto object-cover"
                        />
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {booking.roomName}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {booking.status === 'confirmed' ? 'Confirmed' : 'Upcoming'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div>
                              <p className="text-gray-500">Check In</p>
                              <p className="font-semibold text-gray-900">{booking.checkIn}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Check Out</p>
                              <p className="font-semibold text-gray-900">{booking.checkOut}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Guests</p>
                              <p className="font-semibold text-gray-900">{booking.guests}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total</p>
                              <p className="font-semibold text-[#E63946]">${booking.total}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              Cancel Booking
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+1 (234) 567-890"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-[#E63946] text-white font-semibold rounded-lg hover:bg-[#d32f3d] transition-colors">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-8 h-8 text-gray-400" />
                        <div>
                          <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-[#E63946] hover:text-[#d32f3d] transition-colors">
                        Remove
                      </button>
                    </div>
                    <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#E63946] hover:text-[#E63946] transition-colors">
                      + Add New Payment Method
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
