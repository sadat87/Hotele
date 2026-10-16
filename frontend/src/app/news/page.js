'use client';

import React from 'react';
import PageLayout from '../components/PageLayout';

export default function NewsPage() {
  return (
    <PageLayout
      title="News & Updates"
      subtitle="Stay informed with the latest from our hotels and destinations."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <article className="border-b border-gray-200 pb-12">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">February 20, 2025</p>
            <h2 className="text-2xl font-serif text-gray-800 mb-4">New Tropical Resort Opening This Spring</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <a href="#" className="inline-block mt-4 px-6 py-2 bg-[#E63946] text-white text-sm font-medium uppercase hover:bg-[#d32f3d] transition-colors">
              Read More
            </a>
          </article>

          <article className="border-b border-gray-200 pb-12">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">February 15, 2025</p>
            <h2 className="text-2xl font-serif text-gray-800 mb-4">Exclusive Member Benefits Expanded</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate.
            </p>
            <a href="#" className="inline-block mt-4 px-6 py-2 bg-[#E63946] text-white text-sm font-medium uppercase hover:bg-[#d32f3d] transition-colors">
              Read More
            </a>
          </article>

          <article>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">February 10, 2025</p>
            <h2 className="text-2xl font-serif text-gray-800 mb-4">Sustainable Travel Initiatives</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.
            </p>
            <a href="#" className="inline-block mt-4 px-6 py-2 bg-[#E63946] text-white text-sm font-medium uppercase hover:bg-[#d32f3d] transition-colors">
              Read More
            </a>
          </article>
        </div>
      </div>
    </PageLayout>
  );
}
