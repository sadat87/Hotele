"use client";

import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { loginUser, setUser as setLocalUser } from '../../lib/auth';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { user } = await loginUser(email, password);
      setLocalUser(user);
      setStatus('success');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || 'Sign in failed.';
      setStatus(msg);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Member Access</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-gray-900 mt-4">Welcome back</h1>
            <p className="text-gray-600 mt-3">Sign in to manage bookings, view rewards, and access member-only offers. Secure sign‑in with encrypted authentication.</p>
          </header>

          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-amber-600 opacity-70" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-amber-600 opacity-70" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E63946] text-white text-sm font-medium uppercase tracking-wide hover:bg-[#d32f3d] transition-colors">
                  {status === 'loading' ? 'Signing in…' : 'Sign In'}
                </button>

                <div className="flex items-center gap-4">
                  <a href="/sign-up" className="text-sm text-gray-600 hover:text-amber-600">Create an account</a>
                  <a href="/forgot-password" className="text-sm text-gray-600 hover:text-amber-600">Forgot password?</a>
                </div>
              </div>

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
