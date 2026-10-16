'use client';

import React, { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <PageLayout
      title="Contact Us"
      subtitle="We're here to help with reservations and any questions you may have."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 shadow-md p-8">
            <h2 className="text-xl font-serif text-gray-800 mb-6">Send a message</h2>
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">Phone (optional)</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-890"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2.5 bg-[#E63946] text-white text-sm font-medium uppercase tracking-wide hover:bg-[#d32f3d] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </button>
              {status === 'success' && (
                <p className="text-green-600 text-sm">Thank you — your message has been received.</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-serif text-gray-800 mb-6">Get in touch</h2>
            <div className="space-y-6 text-gray-600">
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <a href="tel:+1234567890" className="hover:text-[#E63946]">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <a href="mailto:info@hotel.example" className="hover:text-[#E63946]">info@hotel.example</a>
                </div>
              </div>
              <p className="text-sm text-gray-500">We typically respond within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
