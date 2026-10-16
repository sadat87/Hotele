"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { registerUser, setUser } from '../../lib/auth';

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const user = await registerUser(firstName, lastName, email, password, phone);
      setUser(user);
      setStatus('success');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || 'Failed to create account.';
      setStatus(msg);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Membership</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-gray-900 mt-4">Join The Grand</h1>
            <p className="text-gray-600 mt-3">Unlock member-only benefits: exclusive rates, saved preferences, and early access to offers.</p>
          </header>

          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="sr-only">First name</span>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-amber-600 opacity-70" />
                    <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition" />
                  </div>
                </label>

                <label className="block">
                  <span className="sr-only">Last name</span>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-amber-600 opacity-70" />
                    <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition" />
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="sr-only">Email</span>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-amber-600 opacity-70" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition" />
                  </div>
                </label>

                <label className="block">
                  <span className="sr-only">Phone</span>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-amber-600 opacity-70" />
                    <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition" />
                  </div>
                </label>
              </div>

              <label className="block">
                <span className="sr-only">Password</span>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-amber-600 opacity-70" />
                  <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition" />
                </div>
              </label>

              <div className="flex items-center gap-4">
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5">Create Account</button>
                <a href="/sign-in" className="text-sm text-gray-600 hover:text-amber-600">Already a member? Sign in</a>
              </div>

              {status === 'loading' && <div className="text-sm text-gray-500">Creating account…</div>}
              {status && status !== 'loading' && status !== 'success' && (
                <div className="text-sm text-red-600">{status}</div>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
