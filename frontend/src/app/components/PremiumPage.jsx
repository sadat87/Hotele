import React from 'react';
import Header from './Header';
import Footer from './Footer';

const defaultHero = 'https://images.unsplash.com/photo-1501117716987-c8e2f6fe38d3?w=1920&h=1080&fit=crop';
const PremiumPage = ({ title, subtitle, description, heroImage = defaultHero, children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900 pt-20">
      <section className="relative w-full h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/12 to-black/20 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center items-start px-6 sm:px-8">
          <p className="text-sm tracking-[0.25em] text-amber-200 uppercase mb-2">{subtitle}</p>
          <h1 className="text-4xl sm:text-6xl font-serif text-white font-light mb-4 drop-shadow-md">{title}</h1>
          {description && <p className="text-base text-amber-100 max-w-2xl">{description}</p>}
          <div className="mt-6 flex items-center gap-3">
            <a href="/browse-hotels" className="px-6 py-3 bg-amber-600 text-white rounded-lg shadow-md hover:shadow-lg">Browse Hotels</a>
            <a href="/contact" className="px-6 py-3 border border-white text-white rounded-lg bg-white/10 hover:bg-white/20">Contact Us</a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="prose prose-lg text-gray-700">{children || (
          <>
            <h2 className="font-serif">Overview</h2>
            <p>
              This premium page is a polished placeholder. Replace this content with real data —
              listings, forms, or rich media as required. The layout is intentionally spacious,
              uses a restrained color palette and strong typography for a premium look.
            </p>

            <h3 className="font-serif">Design notes</h3>
            <ul>
              <li>Large hero with subtle overlay for readable headings</li>
              <li>Generous paddings, serif headings, and muted body text</li>
              <li>Accent color: amber gradient (used for CTAs and highlights)</li>
            </ul>
          </>
        )}</div>
        
        {/* System integration panel (visible in development only) */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-12 bg-gray-50 border border-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">System integration (developer notes)</h3>
          <p className="text-sm text-gray-600 mb-4">These pages integrate with the backend API. Example endpoints available:</p>
          <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
            <li><code>/api/hotels</code> — list and search hotels</li>
            <li><code>/api/offers</code> — current promotions</li>
            <li><code>/api/bookings</code> — create and manage bookings</li>
            <li><code>/api/auth</code> — register and login</li>
            <li><code>/api/payments</code> — payment intents and status</li>
          </ul>

          <p className="text-sm text-gray-600 mb-2">Quick fetch examples:</p>
          <pre className="bg-white p-3 rounded text-xs overflow-auto border border-gray-100">
{`// GET hotels
fetch('/api/hotels')
  .then(r => r.json())
  .then(data => console.log(data));

// POST login
fetch('/api/auth/login', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email, password})})
  .then(r => r.json())
  .then(user => console.log(user));`}
          </pre>

          <p className="text-sm text-gray-600 mt-4">Replace the sample calls with your client wrappers; ensure auth tokens are sent in the <code>Authorization</code> header for protected endpoints.</p>
          </div>
        )}
      </section>
      </main>
      <Footer />
    </>
  );
};

export default PremiumPage;
