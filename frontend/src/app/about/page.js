'use client';

import React from 'react';
import PageLayout from '../components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout
      title="About Us"
      subtitle="Discover our story and commitment to exceptional hospitality."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2 className="text-xl font-serif text-gray-800 mt-12 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            You have a destination, we have a place. We are dedicated to providing unforgettable experiences at every property we manage, combining luxury with genuine warmth and attention to detail.
          </p>
          <h2 className="text-xl font-serif text-gray-800 mt-12 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Excellence in every detail</li>
            <li>Sustainability and responsible travel</li>
            <li>Guest-first hospitality</li>
            <li>Authentic local experiences</li>
          </ul>
          <a href="/contact" className="inline-block px-6 py-2 bg-[#E63946] text-white text-sm font-medium uppercase hover:bg-[#d32f3d] transition-colors">
            Get In Touch
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
