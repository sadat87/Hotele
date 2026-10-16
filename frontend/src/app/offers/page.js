"use client";

import { useState } from 'react';
import { Clock, Gift, Star, ArrowRight, Tag, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const offers = [
  {
    id: 1,
    title: 'Summer Serenity Package',
    subtitle: 'Private villa stay with spa credit',
    image: 'https://images.unsplash.com/photo-1505691723518-36a4c4f7f8b6?w=1200&h=800&fit=crop',
    savings: 'Up to 25% off',
    perks: ['Breakfast included', 'Spa credit', 'Late checkout']
  },
  {
    id: 2,
    title: 'City Elegance Escape',
    subtitle: 'Suite stay with dining experience',
    image: 'https://images.unsplash.com/photo-1562886457-dc90d47b9d08?w=1200&h=800&fit=crop',
    savings: 'Save $150',
    perks: ['Complimentary dinner', 'Room upgrade subject to availability']
  },
  {
    id: 3,
    title: 'Wellness Retreat',
    subtitle: 'Holistic spa & wellness itinerary',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop',
    savings: 'Seasonal rate',
    perks: ['Daily yoga', 'Spa treatments']
  },
  {
    id: 4,
    title: 'Romance in Paris',
    subtitle: 'Intimate package with private tour',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
    savings: 'Exclusive offer',
    perks: ['Private city tour', 'Champagne on arrival']
  }
];

const featured = {
  id: 0,
  title: 'Limited Suite Release',
  subtitle: 'A very limited number of our signature suites released for a short season',
  image: 'https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=1600&h=900&fit=crop',
  savings: 'Exclusive perks & welcome amenities',
  perks: ['Welcome amenities', 'Private transfer', 'Personal concierge']
};

export default function OffersPage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="relative rounded-2xl overflow-hidden bg-white shadow-lg mb-12">
            <div className="relative h-72 md:h-96">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover filter brightness-95"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501117716987-c8e2f6fe38d3?w=1600&h=900&fit=crop'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="relative z-10 -mt-20 px-6 sm:px-10 pb-8">
              <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Limited Availability</p>
                    <h1 className="text-4xl sm:text-5xl font-serif font-light text-gray-900 mt-3 leading-tight drop-shadow-sm">{featured.title}</h1>
                    <p className="text-gray-600 mt-4 max-w-2xl">{featured.subtitle} — book now to secure a truly exclusive experience with our signature services and curated amenities.</p>
                    <div className="mt-6 flex items-center gap-3">
                      <a href="/browse-hotels" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5">
                        View Offers
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button className="px-5 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50">Learn More</button>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:w-2/5">
                    <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                      <p className="text-sm text-amber-700 font-semibold">Perks</p>
                      <ul className="mt-3 space-y-2 text-gray-700 text-sm">
                        {featured.perks.map((p) => (
                          <li key={p} className="flex items-start gap-3">
                            <Tag className="w-4 h-4 text-amber-600 mt-1" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Offers Grid */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Special Offers</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-gray-900">Curated Seasonal Offers</h2>
                <p className="text-gray-600 mt-2 max-w-2xl">Handpicked packages designed for discerning travelers — limited in number and time.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input placeholder="Search offers" className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-amber-200" />
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                </div>
                <div className="text-sm text-gray-500">Showing {offers.length} offers</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer, idx) => (
                <article key={offer.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-transparent hover:border-gray-50">
                  <div className="relative h-56 bg-gray-100">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=1200&h=800&fit=crop'}} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow">{offer.savings}</div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-serif text-gray-900 mb-2">{offer.title}</h3>
                    <p className="text-gray-600 mb-4">{offer.subtitle}</p>
                    <ul className="text-sm text-gray-700 mb-6 space-y-2">
                      {offer.perks.map((p) => (
                        <li key={p} className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" />{p}</li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <a href="/browse-hotels" className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-0.5">Book Now <ArrowRight className="w-4 h-4" /></a>
                      <button onClick={()=>setSelected(offer.id)} className="text-sm text-gray-600 hover:text-amber-600">View details</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Supporting content */}
          <section className="py-12 border-t border-gray-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-amber-600 font-semibold uppercase text-sm mb-2">Trusted Selection</p>
                <h4 className="text-lg font-serif font-light text-gray-900 mb-2">Handpicked Offers</h4>
                <p className="text-gray-600">Each offer is curated by our team to ensure the highest standard of luxury and value.</p>
              </div>
              <div className="text-center">
                <p className="text-amber-600 font-semibold uppercase text-sm mb-2">Limited Time</p>
                <h4 className="text-lg font-serif font-light text-gray-900 mb-2">Seasonal Availability</h4>
                <p className="text-gray-600">Offers are available for a short window and in limited quantities — book early to secure availability.</p>
              </div>
              <div className="text-center">
                <p className="text-amber-600 font-semibold uppercase text-sm mb-2">Luxury Service</p>
                <h4 className="text-lg font-serif font-light text-gray-900 mb-2">Personal Concierge</h4>
                <p className="text-gray-600">Every booking is supported by our concierge team to personalize your stay and experience.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
