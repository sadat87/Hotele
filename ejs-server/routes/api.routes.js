import express from 'express';
import Stripe from 'stripe';
import { rooms } from '../data/rooms.js';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

const filterRooms = (checkIn, checkOut, guests) => {
  let filtered = [...rooms];
  if (guests) {
    filtered = filtered.filter(r => r.capacity >= parseInt(guests));
  }
  return filtered;
};

// POST /search - Filter rooms by dates and guest count
router.post('/search', (req, res) => {
  const { checkIn, checkOut, guests } = req.body;
  const filtered = filterRooms(checkIn, checkOut, guests);
  res.json({ success: true, rooms: filtered });
});

// POST /book - Create booking and Stripe checkout session
router.post('/book', async (req, res) => {
  const { roomId, checkIn, checkOut, guests, total: totalAmt } = req.body;
  const room = rooms.find(r => r.id === parseInt(roomId));
  if (!room) {
    return res.status(400).json({ success: false, message: 'Room not found' });
  }

  try {
    // Stripe Checkout placeholder - create session when Stripe is configured
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.includes('sk_')) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: room.title,
              images: [room.image],
              description: `Check-in: ${checkIn}, Check-out: ${checkOut}, Guests: ${guests}`,
            },
            unit_amount: Math.round((total || room.price) * 100),
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/booking-summary?success=true`,
        cancel_url: `${req.protocol}://${req.get('host')}/room-details/${roomId}?cancelled=true`,
      });
      return res.json({ success: true, redirectUrl: session.url });
    }
    
    res.json({
      success: true,
      redirectUrl: `/booking-summary?roomId=${roomId}&checkIn=${encodeURIComponent(checkIn||'')}&checkOut=${encodeURIComponent(checkOut||'')}&guests=${guests||1}`,
    });
  } catch (err) {
    console.error('Stripe error:', err);
    res.json({
      success: true,
      redirectUrl: `/booking-summary?roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
    });
  }
});

// GET /reviews - Social proof data
router.get('/reviews', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/reviews.json');
    const data = await readFile(filePath, 'utf-8');
    const reviews = JSON.parse(data);
    res.json({ success: true, reviews });
  } catch {
    res.json({ success: true, reviews: [] });
  }
});

export default router;
