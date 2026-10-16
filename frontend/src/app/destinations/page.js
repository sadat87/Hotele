'use client';

import { useState } from 'react';
import { MapPin, ArrowRight, Heart, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const destinations = [
  {
    id: 1,
    name: 'Maldives',
    region: 'Indian Ocean',
    tagline: 'Crystalline waters & overwater villas',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
    hotels: 12,
    highlights: ['Beach', 'Diving', 'Luxury Resorts']
  },
  {
    id: 2,
    name: 'Swiss Alps',
    region: 'Switzerland',
    tagline: 'Alpine peaks & world-class ski resorts',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    hotels: 18,
    highlights: ['Mountains', 'Skiing', 'Spa']
  },
  {
    id: 3,
    name: 'Bali',
    region: 'Indonesia',
    tagline: 'Tropical paradise with cultural richness',
    image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&h=600&fit=crop',
    hotels: 15,
    highlights: ['Beach', 'Culture', 'Wellness']
  },
  {
    id: 4,
    name: 'Paris',
    region: 'France',
    tagline: 'The City of Light & timeless elegance',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    hotels: 22,
    highlights: ['City', 'Romance', 'Fine Dining']
  },
  {
    id: 5,
    name: 'Dubai',
    region: 'United Arab Emirates',
    tagline: 'Ultramodern luxury in the desert',
    image: 'https://images.unsplash.com/photo-1512453575692-fc3a4b5b5b2d?w=800&h=600&fit=crop',
    hotels: 25,
    highlights: ['Luxury', 'Shopping', 'Desert']
  },
  {
    id: 6,
    name: 'Tokyo',
    region: 'Japan',
    tagline: 'Modern metropolis meets ancient tradition',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9b0?w=800&h=600&fit=crop',
    hotels: 20,
    highlights: ['City', 'Culture', 'Gastronomy']
  }
];

const experiences = [
  { icon: '🏖️', title: 'Beach Escapes', description: 'Pristine shores and ocean serenity' },
  { icon: '⛰️', title: 'Mountain Retreats', description: 'Alpine tranquility and adventure' },
  { icon: '🏙️', title: 'Urban Elegance', description: 'Cosmopolitan sophistication and culture' },
  { icon: '🌿', title: 'Wellness & Spa', description: 'Rejuvenation and holistic healing' },
  { icon: '🍽️', title: 'Culinary Journeys', description: 'World-class dining experiences' },
  { icon: '🎭', title: 'Cultural Immersion', description: 'Heritage and authentic experiences' }
];

export default function DestinationsPage() {
  const [favorites, setFavorites] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('all');

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredDestinations = selectedRegion === 'all' 
    ? destinations 
    : destinations.filter(d => d.region === selectedRegion);

  const regions = ['all', ...new Set(destinations.map(d => d.region))];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
        
        {/* Premium Hero Section */}
        <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-48 bottom-0 w-96 h-96 bg-amber-100/5 rounded-full blur-3xl"></div>

            <div className="relative text-center">
              <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-4">Global Collection</p>
              <h1 className="text-6xl sm:text-7xl font-light font-serif text-gray-900 mb-6 leading-tight">
                Discover Your Next Escape
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-12">
                Explore our curated selection of luxury destinations across the globe. From serene beaches to majestic mountains, find your perfect sanctuary.
              </p>
              <a href="/browse-hotels" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105">
                Browse All Hotels
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              <span className="text-sm text-gray-600 font-semibold whitespace-nowrap">Filter by region:</span>
              <div className="flex gap-3">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                      selectedRegion === region
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region === 'all' ? 'All Destinations' : region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Destinations Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-3">Premium Destinations</p>
              <h2 className="text-5xl font-light font-serif text-gray-900">Handpicked Locations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <div 
                  key={destination.id}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                >
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden bg-gray-200">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=800&h=600&fit=crop';
                      }}
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(destination.id)}
                      className="absolute top-6 right-6 p-3 rounded-full bg-white/90 backdrop-blur hover:bg-white transition-all duration-300 shadow-lg z-10"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${
                          favorites[destination.id]
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600 hover:text-red-500'
                        }`}
                      />
                    </button>

                    {/* Hotel Count Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-gray-900 shadow-lg">
                      {destination.hotels} hotels
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-amber-600 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{destination.region}</span>
                      </div>
                      <h3 className="text-3xl font-serif font-light text-gray-900">{destination.name}</h3>
                    </div>

                    <p className="text-gray-600 font-light mb-6">{destination.tagline}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a
                      href={`/browse-hotels?region=${destination.region}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm group/btn"
                    >
                      Explore Hotels
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600">No destinations found in this region.</p>
              </div>
            )}
          </div>
        </section>

        {/* Curated Experiences Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">Luxury Experiences</p>
              <h2 className="text-5xl font-light font-serif mb-4">Choose Your Adventure</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                From serene wellness retreats to thrilling cultural journeys
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <div className="text-5xl mb-4">{exp.icon}</div>
                  <h3 className="text-2xl font-serif font-light mb-2">{exp.title}</h3>
                  <p className="text-gray-300 font-light">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Assurance Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-serif font-light text-gray-900 mb-3">Curated Selection</h3>
                <p className="text-gray-600 font-light">Every destination and hotel is personally vetted for excellence and luxury standards.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-serif font-light text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600 font-light">Explore over 200 premium destinations across 6 continents with world-class accommodations.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-serif font-light text-gray-900 mb-3">Unique Moments</h3>
                <p className="text-gray-600 font-light">Create unforgettable memories at some of the world's most exclusive and luxurious properties.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-amber-700">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-light font-serif mb-6">Ready to Explore?</h2>
            <p className="text-xl font-light text-amber-50 mb-10 max-w-2xl mx-auto">
              Start your luxury travel journey today. Find your perfect destination and book with confidence.
            </p>
            <a href="/browse-hotels" className="inline-flex items-center gap-3 px-10 py-4 bg-white text-amber-700 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Browse All Hotels
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
