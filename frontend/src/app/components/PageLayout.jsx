'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Shared layout for sub-pages (News, About, Contact) - maintains consistent header, footer, and styling.
 */
export default function PageLayout({ children, title, subtitle, className = '' }) {
  return (
    <>
      <Header />
      <main className={`min-h-screen bg-white pt-24 pb-20 ${className}`}>
        {title && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h1 
              className="text-4xl sm:text-5xl font-serif italic text-gray-800"
              style={{ fontFamily: 'Georgia, Garamond, serif' }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-gray-600 text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </main>
      <Footer />
    </>
  );
}
