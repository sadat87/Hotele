'use client';

import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#E63946] to-[#d32f3d]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-serif italic text-white mb-4"
          style={{ fontFamily: 'Georgia, Garamond, serif' }}
        >
          Stay Connected
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/90 text-lg mb-8"
        >
          Subscribe to our newsletter for exclusive offers, travel tips, and special promotions
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-8 py-4 bg-white text-[#E63946] font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            {subscribed ? (
              <>
                <Check className="w-5 h-5" />
                Subscribed!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Subscribe
              </>
            )}
          </motion.button>
        </motion.form>
        {subscribed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-white/90"
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
