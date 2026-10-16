# Hotel Booking Website - Express + EJS

Premium hotel booking website built with Node.js, Express, and EJS templating.

## Features

- **Dynamic Room Grid** - Rooms fetched from backend, rendered with EJS forEach
- **Advanced Search** - POST /search filters by check-in, check-out, guests
- **Interactive Amenities** - Hover-responsive icons (WiFi, Spa, Gym, etc.)
- **Deal of the Day** - Countdown timer banner
- **Room Category Tabs** - Suites, Deluxe, Penthouse (no page reload)
- **Real-time Reviews** - Social proof from JSON
- **Date-Range Price** - Dynamic total calculation in Quick Book sidebar
- **360° Virtual Tour** - Modal with panoramic placeholder
- **Local Attractions** - Top 5 things to do nearby
- **Loyalty Program CTA** - "Join for 15% off" banner
- **Sticky Quick Book** - Sidebar follows scroll
- **FAQ Accordion** - Check-in, pet policy, cancellation
- **Multi-Payment Footer** - Visa, Mastercard, PayPal, Apple Pay, Crypto

## Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Home |
| `/rooms` | GET | Room listing with category tabs |
| `/search` | POST | Search results (filters rooms) |
| `/room-details/:id` | GET | Room detail + Quick Book |
| `/about` | GET | About page |
| `/contact` | GET/POST | Contact form |
| `/booking-summary` | GET | Booking confirmation |
| `/profile` | GET | User profile |

## API

- `POST /api/search` - Filter rooms (JSON)
- `POST /api/book` - Create booking, Stripe checkout placeholder
- `GET /api/reviews` - Reviews JSON

## Run

```bash
cd ejs-server
npm install
npm run dev
```

Open http://localhost:3002

## Stripe Integration

Set `STRIPE_SECRET_KEY` in `.env` to enable real Stripe checkout. Without it, bookings redirect to summary (mock flow).
