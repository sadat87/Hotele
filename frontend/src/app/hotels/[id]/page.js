"use client";

import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Users, Check, AlertCircle, Loader } from 'lucide-react';
import apiClient from '../../../lib/apiClient';
import { getUser } from '../../../lib/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HotelPage({ params }) {
  const { id } = params;
  const [form, setForm] = useState({ name: '', email: '', checkIn: '', checkOut: '', guests: 1 });
  const [status, setStatus] = useState(null);
  const [hotelInfo] = useState({ name: 'Luxury Resort & Spa', location: 'Premium Destination' });

  useEffect(() => {
    try {
      const u = getUser();
      if (u) {
        setForm((prev) => ({ 
          ...prev, 
          name: (u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : u.email), 
          email: u.email || prev.email 
        }));
      }
    } catch (err) {
      // ignore
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitBooking = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = {
        hotelId: id,
        guestName: form.name,
        guestEmail: form.email,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: parseInt(form.guests),
      };

      const res = await apiClient.post('/bookings', payload);
      setStatus('success');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || 'Failed to create booking.';
      setStatus(msg);
    }
  };

  const user = getUser();
  const nights = form.checkIn && form.checkOut 
    ? Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-3">Exclusive Booking</p>
            <h1 className="text-5xl sm:text-6xl font-light font-serif text-gray-900 mb-4">Complete Your Reservation</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {user ? `Welcome back, ${user.firstName || user.email}. Finalize your luxurious stay.` : 'Secure your premium accommodation experience with our simple booking process.'}
            </p>
          </div>

          {/* Main Booking Container */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Booking Form - Main Column */}
            <div className="lg:col-span-2">
              <form onSubmit={submitBooking} className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 space-y-8">
                
                {/* Guest Information Section */}
                <div>
                  <h2 className="text-2xl font-serif font-light text-gray-900 mb-6 pb-4 border-b border-gray-100">Guest Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-4 w-5 h-5 text-amber-600 opacity-60" />
                        <input 
                          name="name" 
                          placeholder="Your full name" 
                          value={form.name} 
                          onChange={handleChange} 
                          required 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400" 
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-amber-600 opacity-60" />
                        <input 
                          name="email" 
                          type="email"
                          placeholder="your@email.com" 
                          value={form.email} 
                          onChange={handleChange} 
                          required 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stay Details Section */}
                <div>
                  <h2 className="text-2xl font-serif font-light text-gray-900 mb-6 pb-4 border-b border-gray-100">Your Stay</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Check-in Date */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 w-5 h-5 text-amber-600 opacity-60 pointer-events-none" />
                        <input 
                          name="checkIn" 
                          type="date" 
                          value={form.checkIn} 
                          onChange={handleChange} 
                          required 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200 text-gray-900" 
                        />
                      </div>
                    </div>

                    {/* Check-out Date */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 w-5 h-5 text-amber-600 opacity-60 pointer-events-none" />
                        <input 
                          name="checkOut" 
                          type="date" 
                          value={form.checkOut} 
                          onChange={handleChange} 
                          required 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200 text-gray-900" 
                        />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-4 w-5 h-5 text-amber-600 opacity-60" />
                        <select 
                          name="guests" 
                          value={form.guests} 
                          onChange={handleChange} 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200 text-gray-900 appearance-none"
                        >
                          {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-4 flex items-center text-gray-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust & Safety Section */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-50/50 rounded-2xl p-6 border border-amber-100">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-amber-600 font-semibold text-sm mb-1">🔒 Secure</div>
                      <p className="text-xs text-gray-600">SSL Encrypted</p>
                    </div>
                    <div>
                      <div className="text-amber-600 font-semibold text-sm mb-1">✓ Free Cancel</div>
                      <p className="text-xs text-gray-600">Until 48h before</p>
                    </div>
                    <div>
                      <div className="text-amber-600 font-semibold text-sm mb-1">24/7 Support</div>
                      <p className="text-xs text-gray-600">Always here</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button & Status */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-lg"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900">Booking Confirmed!</p>
                      <p className="text-sm text-green-700">A confirmation email has been sent to your inbox.</p>
                    </div>
                  </div>
                )}

                {status && status !== 'loading' && status !== 'success' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Booking Error</p>
                      <p className="text-sm text-red-700">{status}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Booking Summary Sidebar */}
            <div>
              <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24 space-y-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Your Booking</p>
                  <h3 className="text-2xl font-serif font-light text-gray-900">{hotelInfo.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">📍 {hotelInfo.location}</p>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Check-in</span>
                    <span className="font-semibold text-gray-900">{form.checkIn || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Check-out</span>
                    <span className="font-semibold text-gray-900">{form.checkOut || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-semibold text-gray-900">{form.guests || '—'}</span>
                  </div>
                  {nights > 0 && (
                    <div className="flex justify-between items-center bg-amber-50 rounded-lg px-4 py-2">
                      <span className="font-semibold text-gray-900">Duration</span>
                      <span className="font-bold text-amber-700">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-4 h-4" />
                      <span>Flexible cancellation</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-4 h-4" />
                      <span>Best rate guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-4 h-4" />
                      <span>Secure transaction</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                  <p className="text-xs text-gray-600 mb-2">Estimated Total</p>
                  <p className="text-3xl font-light text-amber-700">
                    {nights > 0 ? `$${(nights * 299).toLocaleString()}` : '—'}
                  </p>
                  {nights > 0 && <p className="text-xs text-gray-600 mt-2">${299} per night</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
