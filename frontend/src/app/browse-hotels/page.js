"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Star, MapPin, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiClient from '../../lib/apiClient';

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow p-4">
      <div className="h-44 bg-gray-200 rounded-md mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
    </div>
  );
}

export default function BrowseHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [destination, setDestination] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [amenity, setAmenity] = useState('all');

  useEffect(() => {
    let mounted = true;

    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiClient.get('/hotels');
        console.log('GET /hotels response:', res);
        if (!mounted) return;
        const hotelsList = res.data?.data?.hotels || res.data?.data || [];
        setHotels(hotelsList);
      } catch (err) {
        console.error('Failed to fetch hotels', err);
        if (err.message === 'Network Error') {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
          setError(`Network Error: unable to reach backend at ${apiUrl}. Is the backend running?`);
        } else {
          setError(err?.response?.data?.message || err.message || 'Failed to fetch hotels');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchHotels();

    return () => {
      mounted = false;
    };
  }, []);

  const destinations = useMemo(() => ['all', ...new Set(hotels.map(h => h.location || h.city || 'Unknown'))], [hotels]);
  const amenities = useMemo(() => {
    const setA = new Set();
    hotels.forEach(h => (h.amenities || []).forEach(a => setA.add(a)));
    return ['all', ...Array.from(setA)];
  }, [hotels]);

  const filtered = useMemo(() => {
    return hotels.filter(h => {
      if (destination !== 'all' && (h.location || h.city) !== destination) return false;
      const price = h.pricePerNight || h.price || (h.pricing && h.pricing.base) || 0;
      if (price && price > maxPrice) return false;
      if (amenity !== 'all' && !(h.amenities || []).includes(amenity)) return false;
      return true;
    });
  }, [hotels, destination, maxPrice, amenity]);

  // Normalize image URL (handle relative paths from backend)
  const normalizeImage = (url) => {
    const fallback = 'https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=1200&h=800&fit=crop';
    if (!url) return fallback;
    if (typeof url !== 'string') return fallback;
    if (/^https?:\/\//i.test(url)) return url;
    // If backend returns a relative path, prefix with backend origin (strip /api)
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/i, '');
    if (url.startsWith('/')) return `${apiBase}${url}`;
    return `${apiBase}/${url}`;
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="text-center mb-12">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Curated Collection</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-gray-900 mt-4">Browse Luxury Hotels</h1>
            <p className="text-gray-600 mt-3 max-w-3xl mx-auto">A thoughtfully curated selection of luxury properties chosen for their quality, service and unique experiences.</p>
          </section>

          {/* Filters */}
          <section className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex items-center gap-3">
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="px-4 py-2 rounded-full bg-white border border-gray-200">
                  {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                <select value={amenity} onChange={(e) => setAmenity(e.target.value)} className="px-4 py-2 rounded-full bg-white border border-gray-200">
                  {amenities.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600">Max price</label>
              <input type="range" min={50} max={2000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-40" />
              <div className="text-sm text-gray-700">${maxPrice}</div>
            </div>
          </section>

          {/* Listings */}
          <section>
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-4 text-red-600">
                <div>{error}</div>
                <button onClick={() => window.location.reload()} className="px-3 py-1.5 bg-amber-600 text-white rounded-md">Retry</button>
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="text-center py-16 text-gray-600">No hotels match your filters.</div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((h) => {
                  const id = h._id || h.id;
                  const image = normalizeImage(h.image || h.heroImage || h.imageUrl || (h.images && h.images[0]));
                  const location = h.location || h.city || '—';
                  const price = h.pricePerNight || h.price || (h.pricing && h.pricing.base) || null;
                  const rating = h.rating || (h.reviews && h.reviews.avg) || null;

                  return (
                    <article key={id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                      <a href={`/hotels/${id}`} className="block">
                        <div className="relative h-60 bg-gray-100">
                          <img src={image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e)=>{e.currentTarget.src='https://images.unsplash.com/photo-1564078302143-fac5d829b44d?w=1200&h=800&fit=crop'}} />
                          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow">{rating ? `${rating} ★` : 'Recommended'}</div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-serif font-light text-gray-900 mb-1">{h.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{location}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-3 line-clamp-2">{h.subtitle || h.description || 'A refined luxury stay offering exceptional service and amenities.'}</p>
                            </div>

                            <div className="text-right">
                              {price ? (
                                <div className="text-2xl font-light text-amber-600">${price}</div>
                              ) : (
                                <div className="text-sm text-gray-500">Contact for rates</div>
                              )}
                              <div className="text-xs text-gray-500 mt-1">per night</div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-2">
                              {(h.amenities || []).slice(0,3).map((a,idx) => (
                                <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">{a}</span>
                              ))}
                            </div>
                            <div>
                              <a href={`/hotels/${id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg shadow hover:shadow-lg">View details</a>
                            </div>
                          </div>
                        </div>
                      </a>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
